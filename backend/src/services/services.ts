import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';
import { Encrypt } from './encrypt/encrypt.service';

const user = new User({
  userRepository,
});

const encrypt = new Encrypt();

const auth = new Auth({
  userService: user,
  encryptService: encrypt,
});

export { auth, user, encrypt };
