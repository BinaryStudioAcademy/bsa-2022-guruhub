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

  public constructor({ got, sessionStorage }: Constructor) {
    this.#got = got;
    this.#sessionStorage = sessionStorage;
  }

  public get(): this {
    this.#options.method = 'get';

    return this;
  }

  public head(): this {
    this.#options.method = 'head';

    return this;
  }

  public options(): this {
    this.#options.method = 'options';

    return this;
  }

  public trace(): this {
    this.#options.method = 'trace';

    return this;
  }

  public post(): this {
    this.#options.method = 'post';

    return this;
  }

  public put(): this {
    this.#options.method = 'put';

    return this;
  }

  public patch(): this {
    this.#options.method = 'patch';

    return this;
  }

  public delete(): this {
    this.#options.method = 'delete';

    return this;
  }

  public path(path: string): this {
    this.#options.url = path.replace(/^\/+/, '');

    return this;
  }

  public noAutoAuth(): this {
    this.#options.hasAutoAuth = false;

    return this;
  }

  public authorize(customToken?: string): this {
    const token = customToken ?? this.#getToken();

    if (token) {
      this.headers({
        Authorization: `Bearer ${token}`,
      });
    }

    return this;
  }

  public query(
    query: Record<string, string | number | boolean | null | undefined>,
  ): this {
    this.#options.searchParams = query;

    return this;
  }

  public headers(headers: Headers): this {
    this.#options.headers = {
      ...(this.#options.headers ?? {}),
      ...headers,
    };

    return this;
  }

  // JSON body can be anything. Even non-object.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data(data: any): this {
    this.#options.json = data;

    return this;
  }

  public form(data: FormData): this {
    this.#options.body = data;

    return this;
  }

  public async send<T>(): Promise<Response<T>> {
    if (this.#options.hasAutoAuth ?? true) {
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
