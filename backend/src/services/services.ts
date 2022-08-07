import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Encrypt } from './encrypt/encrypt.service';
import { User } from './user/user.service';

const encrypt = new Encrypt();

const user = new User({
  userRepository,
  encryptService: encrypt,
});

const auth = new Auth({
  userService: user,
});

export { auth, user };
