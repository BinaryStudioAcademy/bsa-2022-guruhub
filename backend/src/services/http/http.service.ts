import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

import { HttpMethod } from '~/common/enums/enums';
import { HttpOptions } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';

class Http {
  #http: AxiosInstance;

  public constructor() {
    this.#http = axios.create();
  }

  public async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const { headers = {}, method = HttpMethod.GET } = options;

    const res = this.#http
      .request({
        url,
        method,
        headers: headers as AxiosRequestHeaders | undefined,
      })
      .then(this.getData<T>)
      .catch(this.throwError);

    return res;
  }

  private getData<T = unknown>(res: AxiosResponse): T {
    return res.data;
  }

  private throwError(err: AxiosError): never {
    if (err.response) {
      throw new HttpError({
        status: err.response.status,
        message: err.message,
      });
    }

    throw err;
  }
}

export { Http };
