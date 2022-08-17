import { ENV } from '~/common/enums/enums';

class Udemy {
  #authorizationToken: string;

  public constructor() {
    this.#authorizationToken = this.getToken();
  }

  protected getHeaders(): Record<string, string> {
    const headers = {
      Authorization: `Basic ${this.#authorizationToken}`,
    };

    return headers;
  }

  protected getToken(): string {
    return Buffer.from(
      `${ENV.UDEMY.CLIENT_ID}:${ENV.UDEMY.CLIENT_SECRET}`,
      'utf-8',
    ).toString('base64');
  }
}

export { Udemy };
