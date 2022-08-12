import axios from 'axios';

import { HttpOptions } from '~/common/types/types';

class Http {
  async get<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const { headers } = options;

    return axios
      .get(url, {
        headers,
      })
      .then((res) => res.data)
      .catch(this.throwError);
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
