import {
  SignJWT,
  generateSecret,
  JWTVerifyResult,
  jwtVerify,
  decodeJwt,
  JWTPayload,
} from 'jose';
import { TokenPayload } from '~/common/types/types';

type Constructor = {
  alg: string;
  expiresIn: string;
};

class Token {
  #alg: string;
  #expiresIn: string;

  constructor({ alg, expiresIn }: Constructor) {
    this.#alg = alg;
    this.#expiresIn = expiresIn;
  }

  async create(data: TokenPayload): Promise<string> {
    const secretKey = await generateSecret(this.#alg);

    return new SignJWT(data)
      .setProtectedHeader({ alg: this.#alg })
      .setExpirationTime(this.#expiresIn)
      .sign(secretKey);
  }

  async verify(token: string): Promise<JWTVerifyResult> {
    const secretKey = await generateSecret(this.#alg);

    return jwtVerify(token, secretKey);
  }

  async decode<T>(token: string): Promise<T> {
    const data = decodeJwt(token);

    return data as JWTPayload & T;
  }
}
export { Token };
