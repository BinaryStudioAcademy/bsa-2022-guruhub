import * as jose from 'jose';
import { SignJWT, generateSecret, JWTVerifyResult } from 'jose';
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

    return jose.jwtVerify(token, secretKey);
  }
}

export { Token };
