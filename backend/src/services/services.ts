import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Encrypt } from './encrypt/encrypt.service';
import { User } from './user/user.service';

const encryptService = new Encrypt();

const user = new User({
  userRepository,
  encryptService,
});

const auth = new Auth({
  userService: user,
});

export { auth, user };
