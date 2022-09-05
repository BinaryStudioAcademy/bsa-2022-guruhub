import {
  ApiPath,
  ContentType,
  CoursesApiPath,
  HttpMethod,
} from 'common/enums/enums';
import {
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseModulesGetAllResponseDto,
  CourseUpdateCategoryRequestArguments,
  EntityPagination,
  EntityPaginationRequestQueryDto,
  MenteesToMentorsRequestDto,
  MenteesToMentorsResponseDto,
  UserDetailsResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class CoursesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAllWithCategories(opts: {
    filtering: CourseFilteringDto;
  }): Promise<CourseGetResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.DASHBOARD}`,
      {
        method: HttpMethod.GET,
        queryString: {
          title: opts.filtering.title,
          categoryKey: opts.filtering.categoryKey,
        },
      },
    );
  }

  public getAll({
    count,
    page,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<CourseGetResponseDto>
  > {
    return this.#http.load<EntityPagination<CourseGetResponseDto>>(
      `${this.#apiPrefix}${ApiPath.COURSES}`,
      {
        method: HttpMethod.GET,
        queryString: {
          count,
          page,
        },
      },
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

  public getById({
    id,
  }: CourseGetRequestParamsDto): Promise<CourseGetResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getCourseModulesById({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<CourseModulesGetAllResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MODULES
      }`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getMentorsByCourseId({
    courseId,
    filteringOpts,
  }: CourseGetMentorsRequestDto): Promise<UserDetailsResponseDto[]> {
    return this.#http.load<UserDetailsResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTORS
      }`,
      {
        method: HttpMethod.GET,
        queryString: {
          mentorName: filteringOpts.mentorName,
        },
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
      {
        method: HttpMethod.GET,
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

  public checkIsMentor({
    courseId,
  }: CourseModulesGetAllRequestParamsDto): Promise<boolean> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.IS_MENTOR_CHECK
      }`,
      {
        method: HttpMethod.GET,
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
      {
        method: HttpMethod.GET,
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
}

export { CoursesApi };
