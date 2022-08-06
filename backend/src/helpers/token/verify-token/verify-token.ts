import { ENV } from '~/common/enums/enums';
import jwt, { Secret, JwtPayload } from 'jsonwebtoken';

export const verifyToken = (token: string): string | JwtPayload =>
  jwt.verify(token, ENV.JWT.SECRET as Secret);
