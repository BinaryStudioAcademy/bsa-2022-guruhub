import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { GroupsCreateRequestDto, GroupsResponseDto } from 'guruhub-shared';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class GroupApi {
  #http: Http;
  #apiPrefix: string;

  constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  create(payload: GroupsCreateRequestDto): Promise<GroupsResponseDto> {
    return this.#http.load(`${this.#apiPrefix}${ApiPath.GROUPS}`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export { GroupApi };
