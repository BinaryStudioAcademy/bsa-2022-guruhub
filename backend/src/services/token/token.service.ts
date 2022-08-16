import {
  decodeJwt,
  generateSecret,
  JWTPayload,
  jwtVerify,
  JWTVerifyResult,
  SignJWT,
} from 'jose';

import { TokenPayload } from '~/common/types/types';

type Constructor = {
  alg: string;
  expiresIn: string;
};

class Token {
  #alg: string;

  #expiresIn: string;

  public constructor({ alg, expiresIn }: Constructor) {
    this.#alg = alg;
    this.#expiresIn = expiresIn;
  }

  public async create(data: TokenPayload): Promise<string> {
    const secretKey = await generateSecret(this.#alg);

    return new SignJWT(data)
      .setProtectedHeader({ alg: this.#alg })
      .setExpirationTime(this.#expiresIn)
      .sign(secretKey);
  }

  public async verify(token: string): Promise<JWTVerifyResult> {
    const secretKey = await generateSecret(this.#alg);

    return jwtVerify(token, secretKey);
  }

  public async decode<T>(token: string): Promise<JWTPayload & T> {
    const data = decodeJwt(token);

    return data as JWTPayload & T;
  }
}
export { Token };
