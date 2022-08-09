import { HttpHeader, HttpMethod, StorageKey } from 'common/enums/enums';
import { HttpOptions } from 'common/types/types';
import { HttpError } from 'exceptions/exceptions';
import { Storage } from 'services/storage/storage.service';

type Constructor = {
  storage: Storage;
};

class Http {
  #storage: Storage;

  constructor({ storage }: Constructor) {
    this.#storage = storage;
  }

  async load<T = unknown>(
    url: string,
    options: Partial<HttpOptions> = {},
  ): Promise<T> {
    const { method = HttpMethod.GET, payload = null, hasAuth = true } = options;
    const headers = this.getHeaders(hasAuth);

    return fetch(url, {
      method,
      headers,
      body: payload,
    })
      .then(this.checkStatus)
      .then((res) => this.parseJSON<T>(res))
      .catch(this.throwError);
  }

  private getHeaders(hasAuth?: boolean): Headers {
    const headers = new Headers();

    if (hasAuth) {
      const token = this.#storage.getItem(StorageKey.TOKEN);
      headers.append(HttpHeader.AUTHORIZATION, `Bearer ${token}`);
    }

    return headers;
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
