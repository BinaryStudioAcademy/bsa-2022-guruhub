import {
  ApiPath,
  ContentType,
  HttpMethod,
  TasksApiPath,
} from 'common/enums/enums';
import {
  EntityPagination,
  TaskByIdRequestParamsDto,
  TaskGetByMenteeIdAndModuleId,
  TaskGetByMenteeIdCourseIdModuleIdRequestDto,
  TaskGetItemReponseDto,
  TaskNoteGetItemResponseDto,
  TaskNoteManipulateRequestDto,
  TasksGetByCourseIdAndMenteeIdRequestDto,
  TaskWithModuleResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class TasksApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ apiPrefix, http }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public manipulate({
    body,
    taskId,
  }: TaskNoteManipulateRequestDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#http.load<TaskNoteGetItemResponseDto>(
      `${this.#apiPrefix}${ApiPath.TASKS}/${taskId}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(body),
      },
    );
  }

  public getByMenteeIdAndModuleId({
    menteeId,
    moduleId,
  }: TaskGetByMenteeIdAndModuleId): Promise<TaskGetItemReponseDto | null> {
    return this.#http.load<TaskGetItemReponseDto>(
      `${this.#apiPrefix}${ApiPath.TASKS}${TasksApiPath.MODULES}/${moduleId}${
        TasksApiPath.MENTEES
      }/${menteeId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getNotes({
    taskId,
  }: TaskByIdRequestParamsDto): Promise<
    EntityPagination<TaskNoteGetItemResponseDto>
  > {
    return this.#http.load<EntityPagination<TaskNoteGetItemResponseDto>>(
      `${this.#apiPrefix}${ApiPath.TASKS}/${taskId}${TasksApiPath.NOTES}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getByMenteeIdCourseIdModuleId({
    courseId,
    menteeId,
    moduleId,
  }: TaskGetByMenteeIdCourseIdModuleIdRequestDto): Promise<TaskGetItemReponseDto> {
    return this.#http.load<TaskGetItemReponseDto>(
      `${this.#apiPrefix}${ApiPath.TASKS}${TasksApiPath.COURSES}/${courseId}${
        TasksApiPath.MODULES
      }/${moduleId}${TasksApiPath.MENTEES}/${menteeId}`,
    );
  }

  public getAllByCourseIdAndMenteeId({
    courseId,
    menteeId,
  }: TasksGetByCourseIdAndMenteeIdRequestDto): Promise<
    TaskWithModuleResponseDto[]
  > {
    return this.#http.load<TaskWithModuleResponseDto[]>(
      `${this.#apiPrefix}${ApiPath.TASKS}${TasksApiPath.COURSES}/${courseId}${
        TasksApiPath.MENTEES
      }/${menteeId}`,
    );
  }
}

export { TasksApi };
