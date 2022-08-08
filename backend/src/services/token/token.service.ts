import {
  SignJWT,
  generateSecret,
  JWTVerifyResult,
  jwtVerify,
  KeyLike,
} from 'jose';
import { TokenPayload } from '~/common/types/types';

type Constructor = {
  alg: string;
  expiresIn: string;
};

class Token {
  #alg: string;
  #expiresIn: string;
  #secretKey: Promise<KeyLike | Uint8Array>;

  constructor({ alg, expiresIn }: Constructor) {
    this.#alg = alg;
    this.#expiresIn = expiresIn;
    this.#secretKey = generateSecret(this.#alg);
  }

  async create(data: TokenPayload): Promise<string> {
    const secret = await this.#secretKey;

    return new SignJWT(data)
      .setProtectedHeader({ alg: this.#alg })
      .setExpirationTime(this.#expiresIn)
      .sign(secret);
  }

  async verify(token: string): Promise<JWTVerifyResult> {
    const secret = await this.#secretKey;

    return jwtVerify(token, secret);
  }
}

export { Token };
