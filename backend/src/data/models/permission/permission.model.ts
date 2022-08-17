import { DbTableName, PermissionKey } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Permission extends Abstract {
  public 'name': string;

  public 'key': PermissionKey;

  public static override get tableName(): string {
    return DbTableName.PERMISSIONS;
  }
}

export { Permission };
