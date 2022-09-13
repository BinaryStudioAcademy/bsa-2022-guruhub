import { Page } from 'objection';

import { MenteesToMentorsStatus, SortOrder } from '~/common/enums/enums';
import {
  CourseCreateRequestArgumentsDto,
  CourseGetByIdAndVendorKeyArgumentsDto,
  CourseGetMenteesByMentorRequestDto,
  CourseGetMentoringDto,
  CourseGetMentorsRequestDto,
  CourseGetResponseDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UserCountRequestDto,
  UserDetailsResponseDto,
} from '~/common/types/types';
import { Course as CourseM } from '~/data/models/models';

type Constructor = {
  CourseModel: typeof CourseM;
};

class Course {
  #CourseModel: typeof CourseM;

  public constructor({ CourseModel }: Constructor) {
    this.#CourseModel = CourseModel;
  }

  public getAllWithCategories(filteringOpts: {
    categoryId: number | null;
    title: string;
  }): Promise<CourseGetResponseDto[]> {
    const { categoryId, title } = filteringOpts ?? {};
    const normalizedTitle = title.replaceAll('\\', '\\\\');

    return this.#CourseModel
      .query()
      .select('*')
      .where((builder) => {
        if (categoryId) {
          builder.where({ courseCategoryId: categoryId });
        }
      })
      .andWhere((builder) => {
        if (title) {
          builder.where('title', 'ilike', `%${normalizedTitle}%`);
        }
      })
      .innerJoin(
        'courseCategories',
        'courses.courseCategoryId',
        'courseCategories.id',
      )
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
  }

  public async getAll({
    count,
    page,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<CourseGetResponseDto>
  > {
    const { results, total } = await this.#CourseModel
      .query()
      .withGraphJoined('category')
      .orderBy('courseCategoryId', SortOrder.DESC)
      .page(page, count)
      .castTo<Page<CourseM & CourseGetResponseDto>>();

    return {
      items: results,
      total,
    };
  }

  public getAllCoursesStudying(
    userId: number,
  ): Promise<CourseGetResponseDto[]> {
    return this.#CourseModel
      .query()
      .select(
        'courses.id',
        'title',
        'description',
        'url',
        'imageUrl',
        'courseCategoryId',
      )
      .distinct('courseId')
      .withGraphJoined('[mentees, category, vendor]')
      .where('menteeId', userId)
      .whereNotNull('mentorId')
      .castTo<CourseGetResponseDto[]>()
      .execute();
  }

  public async getAllCoursesMentoring(
    userId: number,
    { count, page }: EntityPaginationRequestQueryDto,
  ): Promise<EntityPagination<CourseGetMentoringDto>> {
    const { results, total } = await this.#CourseModel
      .query()
      .select('courses.id', 'title', 'studentsCount')
      .withGraphJoined('mentors')
      .where('userId', userId)
      .page(page, count)
      .castTo<Page<CourseM & CourseGetMentoringDto>>();

    return {
      items: results,
      total,
    };
  }

  public async create(
    course: CourseCreateRequestArgumentsDto,
  ): Promise<CourseM> {
    const {
      title,
      description,
      url,
      vendorId,
      courseCategoryId,
      originalId,
      imageUrl,
    } = course;

    return this.#CourseModel.query().insert({
      title,
      description,
      url,
      vendorId,
      courseCategoryId,
      originalId,
      imageUrl,
    });
  }

  public async getByCategoryId(
    courseCategoryId: number,
  ): Promise<CourseGetResponseDto[]> {
    return this.#CourseModel
      .query()
      .where({ courseCategoryId })
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
  }

  public async getByOriginalIdAndVendorKey({
    originalId,
    vendorKey,
  }: CourseGetByIdAndVendorKeyArgumentsDto): Promise<CourseGetResponseDto | null> {
    const course = await this.#CourseModel
      .query()
      .where('courses.originalId', originalId)
      .andWhere('vendor.key', vendorKey)
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto>()
      .first();

    return course ?? null;
  }

  public async getById(courseId: number): Promise<CourseGetResponseDto> {
    return this.#CourseModel
      .query()
      .where({ 'courses.id': courseId })
      .withGraphJoined('[vendor, category]')
      .first()
      .castTo<CourseGetResponseDto>()
      .execute();
  }

  public getMentorsWithMenteesCount(
    courseId: number,
  ): Promise<UserCountRequestDto[]> {
    return this.#CourseModel
      .query()
      .select('mentorId as id')
      .count('*')
      .where({ courseId })
      .innerJoin('menteesToMentors', 'courses.id', 'menteesToMentors.courseId')
      .groupBy('mentorId')
      .castTo<UserCountRequestDto[]>()
      .execute();
  }

  public getMentorsWithMenteesMaxCount(
    courseId: number,
  ): Promise<UserCountRequestDto[]> {
    return this.#CourseModel
      .query()
      .select('mentors.id', 'studentsCount as count')
      .where({ courseId })
      .withGraphJoined(
        'mentors(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .castTo<UserCountRequestDto[]>()
      .execute();
  }

  public getMentorsByCourseId(
    filteredMentorIds: number[],
    { courseId, filteringOpts }: CourseGetMentorsRequestDto,
  ): Promise<UserDetailsResponseDto[]> {
    const { mentorName } = filteringOpts ?? {};

    return this.#CourseModel
      .query()
      .where({ 'courses.id': courseId })
      .andWhere((builder) => {
        if (mentorName) {
          builder.where('fullName', 'ilike', `%${mentorName}%`);
        }
      })
      .whereIn('mentors.id', filteredMentorIds)
      .select(
        'mentors.id',
        'fullName',
        'gender',
        'dateOfBirth',
        'mentors:userDetails:avatar as avatar',
      )
      .withGraphJoined(
        'mentors(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .castTo<UserDetailsResponseDto[]>()
      .execute();
  }

  public getMenteesByCourseIdAndMentorId({
    courseId,
    mentorId,
  }: CourseGetMenteesByMentorRequestDto): Promise<UserDetailsResponseDto[]> {
    return this.#CourseModel
      .query()
      .select('mentees.id', 'fullName', 'mentees:userDetails:avatar as avatar')
      .withGraphJoined(
        '[mentees.[userDetails(withoutMoneyBalance).[avatar]], mentors]',
      )
      .where('mentors.id', mentorId)
      .andWhere('courses.id', courseId)
      .andWhereNot('status', MenteesToMentorsStatus.COMPLETED)
      .distinct('mentees.id')
      .castTo<UserDetailsResponseDto[]>()
      .execute();
  }

  public async updateCategory(
    courseId: number,
    newCategoryId: number,
  ): Promise<CourseGetResponseDto> {
    await this.#CourseModel.query().patchAndFetchById(courseId, {
      courseCategoryId: newCategoryId,
    });

    return this.#CourseModel
      .query()
      .findById(courseId)
      .withGraphJoined('[vendor, category]')
      .castTo<CourseGetResponseDto>()
      .execute();
  }
}

export { Course };
