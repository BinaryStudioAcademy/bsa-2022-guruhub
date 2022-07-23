import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';

const user = new User({
  userRepository,
});

const auth = new Auth({
  userService: user,
});

export { auth, user };
