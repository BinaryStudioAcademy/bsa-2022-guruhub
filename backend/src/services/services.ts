import { user as userRepositoryInstance } from '~/data/repositories/repositories';
import { Auth } from './auth/auth.service';
import { User } from './user/user.service';

const auth = new Auth({
	userRepositoryInstance
});

const user = new User({
	userRepositoryInstance
});

export { auth, user };
