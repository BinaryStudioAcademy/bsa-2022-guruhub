import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UsersToGroups extends Abstract {
  'userId': number;

  'groupId': number;

  static override get tableName(): string {
    return DbTableName.USERS_TO_GROUPS;
  }
}

export { UsersToGroups };
