import FormData from 'form-data';
import { Got, Headers } from 'got';

import { ApiSession, RequestOptions, Response } from '~/lib/common/types/types';
import { SessionStorage } from '~/lib/helpers/helpers';

type Constructor = {
  got: Got;
  sessionStorage: SessionStorage<ApiSession>;
};

class RequestBuilder {
  #got: Got;
  #options: RequestOptions = {};
  #sessionStorage: SessionStorage<ApiSession>;

  constructor({ got, sessionStorage }: Constructor) {
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
    this.#options.hasAutoAuth = false;

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

  async send<T>(): Promise<Response<T>> {
    if (!(this.#options.hasAutoAuth ?? true)) {
      this.authorize();
    }

    // TODO: wrap in allure step

    // There's an issue in got's types with options we never gonna need.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await this.#got<T>(this.#options as any);

    return response as Response<T>;
  }

  #getToken(): string | undefined {
    if (!this.#sessionStorage.isInSession) {
      return;
    }

    return this.#sessionStorage.get('token');
  }
}

export { RequestBuilder };
