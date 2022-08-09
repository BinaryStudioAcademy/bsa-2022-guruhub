import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class User extends Abstract {
  'email': string;

  'fullName': string;

  'passwordHash': string;

  'passwordSalt': string;

  static override get tableName(): string {
    return DbTableName.USERS;
  }
}

export { User };
