import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UserDetails extends Abstract {
  'firstName': string;

  'lastName': string;

  'gender': string;

  'avatarUrl': string;

  'dateOfBirth': string;

  'userId': number;

  static override get tableName(): string {
    return DbTableName.USER_DETAILS;
  }
}

export { UserDetails };
