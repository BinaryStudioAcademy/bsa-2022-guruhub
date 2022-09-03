import {
  ApiPath,
  ContentType,
  HttpMethod,
  InterviewsApiPath,
} from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  InterviewNoteCreateDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
  InterviewNoteGetRequestArgumentsDto,
  InterviewsCreateRequestBodyDto,
  InterviewsGetAllItemResponseDto,
  InterviewsGetInterviewerResponseDto,
  InterviewsResponseDto,
  InterviewUpdateRequestArgumentsDto,
} from '~/common/types/types';
import { Http } from '~/services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class InterviewsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getPage({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<InterviewsGetAllItemResponseDto>
  > {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`,
      {
        method: HttpMethod.GET,
        queryParams: {
          page,
          count,
        },
      },
    );
  }

  public getById(id: number): Promise<InterviewsGetAllItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public getInterviewersByCategory(
    categoryId: number,
  ): Promise<InterviewsGetInterviewerResponseDto[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${
        InterviewsApiPath.INTERVIEWERS
      }${InterviewsApiPath.CATEGORIES}${InterviewsApiPath.ROOT}${categoryId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public update({
    id,
    payload,
  }: InterviewUpdateRequestArgumentsDto): Promise<InterviewsGetAllItemResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}${id}`,
      {
        method: HttpMethod.PUT,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getAllNotes({
    interviewId,
  }: InterviewNoteGetRequestArgumentsDto): Promise<InterviewNoteGetAllResponseDto> {
    return this.#http.load<InterviewNoteGetAllResponseDto>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}/${interviewId}${
        InterviewsApiPath.NOTES
      }`,
      { method: HttpMethod.GET },
    );
  }

  public createNote({
    interviewId,
    note,
  }: InterviewNoteCreateDto): Promise<InterviewNoteGetAllItemResponseDto> {
    return this.#http.load<InterviewNoteGetAllItemResponseDto>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}/${interviewId}${
        InterviewsApiPath.NOTES
      }`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ note }),
      },
    );
  }

  public createInterview(
    payload: InterviewsCreateRequestBodyDto,
  ): Promise<InterviewsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getPassedInterviewCategoryIds(payload: number): Promise<number[]> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}${
        InterviewsApiPath.INTERVIEWEE
      }/${payload}${InterviewsApiPath.CATEGORIES}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { InterviewsApi };
