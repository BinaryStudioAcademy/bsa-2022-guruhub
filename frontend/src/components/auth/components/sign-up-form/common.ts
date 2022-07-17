import { UserPayloadKey } from 'common/enums/enums';
import { CreateUserPayload } from 'common/types/types';

const DEFAULT_SIGN_UP_PAYLOAD: CreateUserPayload = {
	[UserPayloadKey.EMAIL]: ''
};

export { DEFAULT_SIGN_UP_PAYLOAD };
