import {
  CourseCreateRequestArgumentsDto,
  CourseGetByIdAndVendorKeyArgumentsDto,
  CourseGetMenteesByMentorRequestDto,
  CourseGetMentorsRequestDto,
  CourseGetResponseDto,
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

  public getAll(filteringOpts: {
    categoryId: number | null;
    title: string;
  }): Promise<CourseGetResponseDto[]> {
    const { categoryId, title } = filteringOpts ?? {};

    return this.#CourseModel
      .query()
      .where((builder) => {
        if (categoryId) {
          builder.where({ courseCategoryId: categoryId });
        }
      })
      .andWhere((builder) => {
        if (title) {
          builder.where('title', 'ilike', `%${title}%`);
        }
      })
      .withGraphJoined('vendor')
      .castTo<CourseGetResponseDto[]>()
      .execute();
  }

  public async create(
    course: CourseCreateRequestArgumentsDto,
  ): Promise<CourseM> {
    const { title, description, url, vendorId, courseCategoryId, originalId } =
      course;

    return this.#CourseModel.query().insert({
      title,
      description,
      url,
      vendorId,
      courseCategoryId,
      originalId,
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

  public getMentorsByCourseId({
    courseId,
    filteringOpts,
  }: CourseGetMentorsRequestDto): Promise<UserDetailsResponseDto[]> {
    const { mentorName } = filteringOpts ?? {};

    return this.#CourseModel
      .query()
      .where({ 'courses.id': courseId })
      .andWhere((builder) => {
        if (mentorName) {
          builder.where('fullName', 'ilike', `%${mentorName}%`);
        }
      })
      .select('mentors.id', 'gender', 'fullName', 'avatarUrl')
      .joinRelated('mentors.[userDetails]')
      .castTo<UserDetailsResponseDto[]>()
      .execute();
  }

  public getMenteesByCourseIdAndMentorId({
    courseId,
    mentorId,
  }: CourseGetMenteesByMentorRequestDto): Promise<UserDetailsResponseDto[]> {
    return this.#CourseModel
      .query()
      .select('mentees.id', 'fullName', 'avatarUrl')
      .joinRelated('[mentees.[userDetails], mentorsWithMentees]')
      .where('mentorsWithMentees.id', mentorId)
      .where('courses.id', courseId)
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
