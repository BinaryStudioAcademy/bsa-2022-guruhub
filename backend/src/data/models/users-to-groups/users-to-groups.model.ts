import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class UsersToGroups extends Abstract {
  public 'userId': number;

  public 'groupId': number;

  public static override get tableName(): string {
    return DbTableName.USERS_TO_GROUPS;
  }
}

export { UsersToGroups };
