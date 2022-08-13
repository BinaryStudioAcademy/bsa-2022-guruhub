import { DbTableName, PermissionKey } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Permission extends Abstract {
  'name': string;

  'key': PermissionKey;

  static override get tableName(): string {
    return DbTableName.PERMISSIONS;
  }
}

export { Permission };
