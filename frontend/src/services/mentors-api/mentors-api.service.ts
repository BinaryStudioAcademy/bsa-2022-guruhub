import {
  ApiPath,
  ContentType,
  HttpMethod,
  MentorsApiPath,
} from 'common/enums/enums';
import {
  CoursesToMentorsRequestDto,
  CoursesToMentorsResponseDto,
  GetMentorRequestParamsDto,
  MenteesToMentorsResponseDto,
} from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class MentorsApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ apiPrefix, http }: Constructor) {
    this.#apiPrefix = apiPrefix;
    this.#http = http;
  }

  public create(
    payload: CoursesToMentorsRequestDto,
  ): Promise<CoursesToMentorsResponseDto> {
    return this.#http.load<CoursesToMentorsResponseDto>(
      `${this.#apiPrefix}${ApiPath.MENTORS}${MentorsApiPath.ROOT}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify(payload),
      },
    );
  }

  public getMentor({
    menteeId,
    courseId,
  }: GetMentorRequestParamsDto): Promise<MenteesToMentorsResponseDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.MENTORS}${
        MentorsApiPath.COURSES
      }/${courseId}${MentorsApiPath.MENTEES}/${menteeId}`,
      {
        method: HttpMethod.GET,
      },
    );
  }
}

export { MentorsApi };
