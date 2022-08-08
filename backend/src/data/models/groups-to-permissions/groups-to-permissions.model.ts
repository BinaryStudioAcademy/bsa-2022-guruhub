import { DbTableName } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class GroupsToPermissions extends Abstract {
  'permissionId': number;

  'groupId': number;

  static override get tableName(): string {
    return DbTableName.GROUPS_TO_PERMISSIONS;
  }
}

export { GroupsToPermissions };
