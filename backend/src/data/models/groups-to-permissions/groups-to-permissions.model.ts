import { DbTableName } from '~/common/enums/enums';
import { Abstract } from '../abstract/abstract.model';

class GroupsToPermissions extends Abstract {
  'permission_id': number;
  'group_id': number;
  'is_allowed': boolean;

  static override get tableName(): string {
    return DbTableName.GROUPS_TO_PERMISSIONS;
  }
}

export { GroupsToPermissions };
