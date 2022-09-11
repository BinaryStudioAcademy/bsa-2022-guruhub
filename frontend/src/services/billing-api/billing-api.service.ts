import { BillingApiPath } from 'common/enums/api/api';
import { ApiPath, ContentType, HttpMethod } from 'common/enums/enums';
import {
  BillingReplenishParamsDto,
  UserDetailsWithMoneyBalanceDto,
  UserGetResponseWithMoneyBalanceDto,
} from 'common/types/types';
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

  public getUserWithMoneyBalance(): Promise<UserGetResponseWithMoneyBalanceDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.BALANCE}`,
      {
        method: HttpMethod.GET,
      },
    );
  }

  public replenish({
    amountOfMoneyToReplenish,
  }: BillingReplenishParamsDto): Promise<UserDetailsWithMoneyBalanceDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.REPLENISH}`,
      {
        method: HttpMethod.POST,
        contentType: ContentType.JSON,
        payload: JSON.stringify({ amountOfMoneyToReplenish }),
      },
    );
  }

  public withdraw(): Promise<UserDetailsWithMoneyBalanceDto> {
    return this.#http.load(
      `${this.#apiPrefix}${ApiPath.BILLING}${BillingApiPath.WITHDRAW}`,
      {
        method: HttpMethod.POST,
      },
    );
  }
}

export { BillingApi };
