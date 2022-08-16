import got, { Got } from 'got';

import { ApiSession, RequestOptions, Response } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

import { RequestBuilder } from './request-builder';

type Constructor = {
  sessionStorage: SessionStorage<ApiSession>;
};

class HttpService {
  #got: Got;

  #sessionStorage: SessionStorage<ApiSession>;

  public constructor({ sessionStorage }: Constructor) {
    this.#sessionStorage = sessionStorage;

    this.#got = got.extend({
      http2: true,
      throwHttpErrors: false,
      prefixUrl: testsConfig.prefixUrl,
      responseType: 'json',
      headers: {
        Accept: 'application/json',
      },
      retry: {
        limit: 0,
      },
      hooks: {
        beforeRequest: [
          (options: RequestOptions): void => {
            options.startTimeMs = performance.now();
          },
        ],
        afterResponse: [
          (response): Response => {
            const { startTimeMs } = response.request.options as RequestOptions;
            const endTimeMs = performance.now();
            const durationMs = endTimeMs - (startTimeMs ?? endTimeMs);

            const responseWithDuration = response as Response;
            responseWithDuration.durationMs = durationMs;

            return responseWithDuration;
          },
        ],
      },
    });
  }

  public request(): RequestBuilder {
    return new RequestBuilder({
      got: this.#got,
      sessionStorage: this.#sessionStorage,
    });
  }

  public setToken(token: string): void {
    this.#sessionStorage.set('token', token);
  }

  public removeToken(): void {
    this.#sessionStorage.remove('token');
  }
}

export { HttpService };
