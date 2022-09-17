import { BillingApiPath } from 'common/enums/api/api';
import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import { BillingReplenishParamsDto } from 'common/types/types';
import { Http } from 'services/http/http.service';

type Constructor = {
  http: Http;
  apiPrefix: string;
};

class BillingApi {
  #http: Http;

  #apiPrefix: string;

  public constructor({ http, apiPrefix }: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public getUserMoneyBalance(): Promise<number> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.BALANCE}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public replenish({
    amountOfMoneyToReplenish,
    token,
  }: BillingReplenishParamsDto): Promise<number> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.REPLENISH}`,
      {
        method: HttpMethod.PATCH,
        contentType: ContentType.JSON,
        payload: JSON.stringify({
          amountOfMoneyToReplenish,
          token: { id: token.id },
        }),
      },
    );
  }

  public withdraw(): Promise<number> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.WITHDRAW}`,
      {
        method: HttpMethod.PATCH,
      },
    );
  }
}

export { BillingApi };
