import { UserModel } from '~/data/models/models';
import { User } from './user/user.repository';

const user = new User({
	UserModelInstance: UserModel
});

export { user };
