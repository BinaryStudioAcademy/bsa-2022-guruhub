import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class GroupsToPermissions extends Abstract {
  public 'permissionId': number;

  public 'groupId': number;

  public static override get tableName(): string {
    return DbTableName.GROUPS_TO_PERMISSIONS;
  }
}

export { GroupsToPermissions };
