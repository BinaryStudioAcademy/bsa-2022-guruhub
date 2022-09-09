import {
  ApiPath,
  HttpErrorDto,
  InterviewsApiPath,
  InterviewsByIdRequestParamsDto,
  InterviewsByIdResponseDto,
  InterviewsCreateRequestBodyDto,
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';

import { HttpService } from '../http/http.service';

type Constructor = {
  httpService: HttpService;
};

class InterviewService {
  #httpService: HttpService;

  public constructor({ httpService }: Constructor) {
    this.#httpService = httpService;
  }

  public getAllInterviews(): Promise<
    Response<InterviewsGetAllItemResponseDto | HttpErrorDto>
  > {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`)
      .send();
  }

  public createNewInterview(
    data: InterviewsCreateRequestBodyDto,
  ): Promise<Response<InterviewsCreateRequestBodyDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .post()
      .path(`${ApiPath.INTERVIEWS}${InterviewsApiPath.ROOT}`)
      .data(data)
      .send();
  }

  public getInterviewById(
    id: number,
  ): Promise<Response<InterviewsByIdRequestParamsDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .get()
      .path(`${ApiPath.INTERVIEWS}/${id}`)
      .send();
  }

  public updateInterviewStatus(
    id: number,
    data: InterviewsUpdateRequestDto,
  ): Promise<Response<InterviewsByIdResponseDto | HttpErrorDto>> {
    return this.#httpService
      .request()
      .put()
      .path(`${ApiPath.INTERVIEWS}/${id}`)
      .data(data)
      .send();
  }
}

export { InterviewService };
