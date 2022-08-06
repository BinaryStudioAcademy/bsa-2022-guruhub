import { ENV } from '~/common/enums/enums';
import jwt, { JwtPayload, Secret, SignOptions } from 'jsonwebtoken';

export const createToken = (data: JwtPayload): string =>
  jwt.sign(
    data,
    ENV.JWT.SECRET as Secret,
    { expiresIn: ENV.JWT.EXPIRES_IN } as SignOptions,
  );
