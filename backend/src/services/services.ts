import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
import { ENV } from '~/common/enums/enums';
import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Encrypt } from './encrypt/encrypt.service';
import { Token } from './token/token.service';
import { User } from './user/user.service';

const encrypt = new Encrypt({
  salt: USER_PASSWORD_SALT_ROUNDS,
});

const user = new User({
  userRepository,
  encryptService: encrypt,
});

const token = new Token({ alg: ENV.JWT.ALG, expiresIn: ENV.JWT.EXPIRES_IN });

const auth = new Auth({
  userService: user,
  encryptService: encrypt,
  tokenService: token,
});

export { auth, user, token, encrypt };
