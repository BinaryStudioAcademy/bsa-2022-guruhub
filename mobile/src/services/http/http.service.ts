import {
  ContentType,
  HttpHeader,
  HttpMethod,
  StorageKey,
} from '~/common/enums/enums';
import { HttpOptions } from '~/common/types/types';
import { HttpError } from '~/exceptions/exceptions';
import { Storage } from '~/services/storage/storage.service';

type Constructor = {
  storage: Storage;
};

class Http {
  #storage: Storage;

  public constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  public load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const {
      method = HttpMethod.GET,
      payload = null,
      contentType,
      hasAuth = true,
      queryParams,
    } = options;

    const headers = this.getHeaders(contentType, hasAuth);

    return fetch(this.getUrlWithQueryString(url, queryParams), {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(contentType?: ContentType, hasAuth?: boolean): Headers {
    const headers = new Headers();

    if (contentType) {
      headers.append(HttpHeader.CONTENT_TYPE, contentType);
    }

    if (hasAuth) {
      const token = this.#storage.get(StorageKey.ACCESS_TOKEN);
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
  }

  private getUrlWithQueryString(
    url: string,
    queryString?: Record<string, unknown>,
  ): string {
    if (!queryString) {
      return url;
    }
    const query = new URLSearchParams(
      queryString as Record<string, string>,
    ).toString();

    return `${url}?${query}`;
  }

  private async checkStatus(response: Response): Promise<Response> {
    if (!response.ok) {
      const parsedException = await response.json().catch(() => ({
        message: response.statusText,
      }));

      throw new HttpError({
        status: response.status,
        message: parsedException?.message,
      });
    }

    return response;
  }

  private parseJSON<T>(response: Response): Promise<T> {
    return response.json();
  }

  private throwError(err: Error): never {
    throw err;
  }
}

export { Http };
