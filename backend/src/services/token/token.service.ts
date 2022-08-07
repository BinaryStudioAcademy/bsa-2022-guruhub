import * as jose from 'jose';
import { ENV } from '~/common/enums/enums';

class Token {
  #secretkey = new TextEncoder().encode(ENV.JWT.SECRET);

  create(data: jose.JWTPayload): Promise<string> {
    return new jose.SignJWT(data)
      .setProtectedHeader({ alg: ENV.JWT.ALG })
      .setExpirationTime(ENV.JWT.EXPIRES_IN)
      .sign(this.#secretkey);
  }

  verify(token: string): Promise<jose.JWTVerifyResult> {
    return jose.jwtVerify(token, this.#secretkey);
  }
}

export { Token };
