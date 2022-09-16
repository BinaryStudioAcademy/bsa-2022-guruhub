import {
  ApiPath,
  ContentType,
  CoursesApiPath,
  HttpMethod,
} from '~/common/enums/enums';
import {
  CourseFilteringDto,
  CourseGetMentoringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseUpdateCategoryRequestArguments,
  CourseUpdateMentoringDto,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
  UserDetailsResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { Http } from '../http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class Courses {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllWithCategories({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<CourseGetResponseDto>
  > {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.COURSES}`, {
      queryParams: {
        count,
        page,
      },
    });
  }

  public getAll(options: {
    filtering: CourseFilteringDto;
  }): Promise<CourseGetResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.DASHBOARD}`,
      {
        queryParams: {
          title: options.filtering.title,
          categoryKey: options.filtering.categoryKey,
        },
      },
    );
  }

  public getById({
    id,
  }: CourseGetRequestParamsDto): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${id}`,
    );
  }

  public create(url: string): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ url }),
      },
    );
  }

  public updateCategory({
    courseId,
    newCategoryId,
  }: CourseUpdateCategoryRequestArguments): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}/${courseId}${
        CoursesApiPath.CATEGORY
      }`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ newCategoryId }),
      },
    );
  }

  public getMentorsByCourseId({
    courseId,
    filteringOpts,
  }: CourseGetMentorsRequestDto): Promise<UsersGetResponseDto[]> {
    return this.#http.load<UsersGetResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTORS
      }`,
      {
        queryParams: {
          mentorName: filteringOpts.mentorName,
        },
      },
    );
  }

  public chooseMentor({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<MenteesToMentorsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTORS
      }`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          menteeId,
          mentorId,
        }),
      },
    );
  }

  public getMenteesByCourseId(
    courseId: number,
  ): Promise<UserDetailsResponseDto[]> {
    return this.#http.load<UserDetailsResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTEES
      }`,
    );
  }

  public checkIsMentor({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.IS_MENTOR_CHECK
      }`,
    );
  }

  public changeMentor({
    courseId,
    menteeId,
    mentorId,
  }: MenteesToMentorsRequestDto): Promise<MenteesToMentorsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTORS
      }`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          menteeId,
          mentorId,
        }),
      },
    );
  }

  public checkHasMentor({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.HAS_MENTOR_CHECK
      }`,
    );
  }

  public getAllCoursesStudying(): Promise<CourseGetResponseDto[]> {
    return this.#http.load<CourseGetResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.STUDYING}`,
    );
  }

  public getAllCoursesMentoring({
    count,
    page,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<CourseGetMentoringDto>
  > {
    return this.#http.load<EntityPagination<CourseGetMentoringDto>>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.MENTORING}`,
      {
        queryParams: {
          count,
          page,
        },
      },
    );
  }

  public updateCoursesMentoring({
    courseId,
    studentsCount,
  }: CourseUpdateMentoringDto): Promise<number> {
    return this.#http.load<number>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.MENTORING}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ courseId, studentsCount }),
      },
    );
  }
}

export { Courses };
