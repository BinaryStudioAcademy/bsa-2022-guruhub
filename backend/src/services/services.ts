import { user as userRepository } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { Token } from './token/token.service';
import { User } from './user/user.service';

const user = new User({
  userRepository,
});

const token = new Token();

const auth = new Auth({
  userService: user,
  tokenService: token,
});

export { auth, user, token };
