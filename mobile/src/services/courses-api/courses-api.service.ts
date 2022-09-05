import {
  ApiPath,
  ContentType,
  CoursesApiPath,
  HttpMethod,
} from '~/common/enums/enums';
import {
  CourseFilteringDto,
  CourseGetMentorsRequestDto,
  CourseGetRequestParamsDto,
  CourseGetResponseDto,
  CourseModulesGetAllRequestParamsDto,
  CourseUpdateCategoryRequestArguments,
  MenteesToMentorsRequestDto,
  UserDetailsResponseDto,
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

  public getAll(options: {
    filtering: CourseFilteringDto;
  }): Promise<CourseGetResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
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
      {
        method: HttpMethod.GET,
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
  }: CourseGetMentorsRequestDto): Promise<UserDetailsResponseDto[]> {
    return this.#http.load<UserDetailsResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.COURSES}${CoursesApiPath.ROOT}${courseId}${
        CoursesApiPath.MENTORS
      }`,
      {
        method: HttpMethod.GET,
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
  }: MenteesToMentorsRequestDto): Promise<UserDetailsResponseDto[]> {
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
}

export { Courses };
