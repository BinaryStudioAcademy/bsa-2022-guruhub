import FormData from 'form-data';
import got, { Got, Headers, Options, Response } from 'got';

import { ApiSession } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

type HttpServiceConstructor = {
  sessionStorage: SessionStorage<ApiSession>;
};

type RequestBuilderConstructor = {
  got: Got;
  sessionStorage: SessionStorage<ApiSession>;
};

type RequestOptions = Options & {
  noAutoAuth?: boolean;
  startTimeMs?: number;
};

type ResponseWithDuration<T = unknown> = Response<T> & {
  durationMs: number;
};

class RequestBuilder {
  #got: Got;
  #options: RequestOptions = {};
  #sessionStorage: SessionStorage<ApiSession>;

  constructor({ got, sessionStorage }: RequestBuilderConstructor) {
    this.#got = got;
    this.#sessionStorage = sessionStorage;
  }

  get(): this {
    this.#options.method = 'get';

    return this;
  }

  head(): this {
    this.#options.method = 'head';

    return this;
  }

  options(): this {
    this.#options.method = 'options';

    return this;
  }

  trace(): this {
    this.#options.method = 'trace';

    return this;
  }

  post(): this {
    this.#options.method = 'post';

    return this;
  }

  put(): this {
    this.#options.method = 'put';

    return this;
  }

  patch(): this {
    this.#options.method = 'patch';

    return this;
  }

  delete(): this {
    this.#options.method = 'delete';

    return this;
  }

  path(path: string): this {
    this.#options.url = path.replace(/^\/+/, '');

    return this;
  }

  noAutoAuth(): this {
    this.#options.noAutoAuth = true;

    return this;
  }

  authorize(customToken?: string): this {
    const token = customToken ?? this.#getToken();

    if (token) {
      this.headers({
        Authorization: `Bearer ${token}`,
      });
    }

    return this;
  }

  query(
    query: Record<string, string | number | boolean | null | undefined>,
  ): this {
    this.#options.searchParams = query;

    return this;
  }

  headers(headers: Headers): this {
    this.#options.headers = {
      ...(this.#options.headers ?? {}),
      ...headers,
    };

    return this;
  }

  // JSON body can be anything. Even non-object.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data(data: any): this {
    this.#options.json = data;

    return this;
  }

  form(data: FormData): this {
    this.#options.body = data;

    return this;
  }

  async send<T>(): Promise<ResponseWithDuration<T>> {
    if (!this.#options.noAutoAuth) {
      this.authorize();
    }

    // TODO: wrap in allure step

    // There's an issue in got's types with options we never gonna need.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.#got<T>(this.#options as any);

    return response as ResponseWithDuration<T>;
  }

  #getToken(): string | undefined {
    if (!this.#sessionStorage.isInSession) {
      return;
    }

    return this.#sessionStorage.get('token');
  }
}

class HttpService {
  #got: Got;
  #sessionStorage: SessionStorage<ApiSession>;

  constructor({ sessionStorage }: HttpServiceConstructor) {
    this.#sessionStorage = sessionStorage;

    this.#got = got.extend({
      http2: true,
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
          (response): ResponseWithDuration => {
            const { startTimeMs } = response.request.options as RequestOptions;
            const endTimeMs = performance.now();
            const durationMs = endTimeMs - (startTimeMs ?? endTimeMs);

            const responseWithDuration = response as ResponseWithDuration;
            responseWithDuration.durationMs = durationMs;

            return responseWithDuration;
          },
        ],
      },
    });
  }

  request(): RequestBuilder {
    return new RequestBuilder({
      got: this.#got,
      sessionStorage: this.#sessionStorage,
    });
  }

  setToken(token: string): void {
    this.#sessionStorage.set('token', token);
  }

  removeToken(): void {
    this.#sessionStorage.remove('token');
  }
}

export { HttpService };
