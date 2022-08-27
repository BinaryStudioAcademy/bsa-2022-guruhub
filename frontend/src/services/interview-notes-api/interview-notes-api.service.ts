import {
  ApiPath,
  ContentType,
  HttpMethod,
  InterviewsApiPath,
} from 'common/enums/enums';
import {
  InterviewNoteCreateDto,
  InterviewNoteGetAllItemResponseDto,
  InterviewNoteGetAllResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class InterviewNotesApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getAll(interviewId: number): Promise<InterviewNoteGetAllResponseDto> {
    return this.#http.load<InterviewNoteGetAllResponseDto>(
      `${this.#apiPrefix}${ApiPath.INTERVIEWS}/${interviewId}${
        InterviewsApiPath.NOTES
      }`,
      { method: HttpMethod.GET },
    );
  }

  public create({
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
}

export { InterviewNotesApi };
