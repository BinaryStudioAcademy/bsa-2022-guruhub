import axios, { AxiosError, AxiosResponse } from 'axios';

import { HttpOptions } from '~/common/types/types';

class Http {
  async get<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<AxiosResponse<T>> {
    const { headers } = options;

    try {
      const res: Promise<AxiosResponse<T>> = axios.get(url, {
        headers,
      });

      return res;
    } catch (err) {
      this.throwError(err as AxiosError);
    }
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
