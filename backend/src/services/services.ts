import { USER_PASSWORD_SALT_ROUNDS } from '~/common/constants/user.constants';
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

const token = new Token();

const auth = new Auth({
  userService: user,
  encryptService: encrypt,
  tokenService: token,
});

export { auth, user, token, encrypt };
