import { ContentType } from 'allure-js-commons';
import { allure } from 'allure-mocha/runtime';
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

    const response: Response<T> = await allure.createStep(
      this.#getAllureStepName(),
      async () => {
        if (this.#options.json) {
          allure.createAttachment(
            'Request body',
            JSON.stringify(this.#options.json, null, 2),
            ContentType.JSON,
          );
        }

        if (this.#options.body) {
          allure.createAttachment(
            'Request body',
            (this.#options.body as FormData).getBuffer(),
            ContentType.TEXT,
          );
        }

        // There's an issue in got's types with options we never gonna need.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await this.#got<T>(this.#options as any);

        allure.createAttachment(
          'Response body',
          JSON.stringify(response.body, null, 2),
          ContentType.JSON,
        );

        return response;
      },
    )();

    return response;
  }

  #getToken(): string | undefined {
    if (!this.#sessionStorage.isInSession) {
      return;
    }

    return this.#sessionStorage.get('token');
  }

  #getAllureStepName(): string {
    const method = (this.#options.method ?? 'get').toUpperCase();
    const url = this.#options.url ?? '/';

    const qs = this.#options.searchParams
      ? '?' +
        Object.entries(this.#options.searchParams)
          .map(([name, value]) => `${name}=${value}`)
          .join('&')
      : '';

    return `${method} ${url}${qs}`;
  }
}

export { RequestBuilder };
