import axios, { AxiosError } from 'axios';

import { HttpOptions } from '~/common/types/types';

class Http {
  async get<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const { headers } = options;

    try {
      return axios.get(url, {
        headers,
      });
    } catch (err) {
      this.throwError(err as AxiosError);
    }
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
