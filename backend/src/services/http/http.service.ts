import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

import { HttpMethod } from '~/common/enums/enums';
import { HttpOptions } from '~/common/types/types';

class Http {
  #http: AxiosInstance;

  constructor() {
    this.#http = axios.create();
  }

  async load<T = unknown>(
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

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
