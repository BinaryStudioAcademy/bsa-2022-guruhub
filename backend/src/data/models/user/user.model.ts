import { DbTableName, UserPayloadKey } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class User extends Abstract {
	[UserPayloadKey.EMAIL]!: string;

	static override get tableName(): string {
		return DbTableName.USERS;
	}
}

export { User };
