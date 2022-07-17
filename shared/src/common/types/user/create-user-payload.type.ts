import { UserPayloadKey } from '~/common/enums/enums';
import { User } from './user.type';

type CreateUserPayload = Pick<User, UserPayloadKey.EMAIL>;

export { CreateUserPayload };
