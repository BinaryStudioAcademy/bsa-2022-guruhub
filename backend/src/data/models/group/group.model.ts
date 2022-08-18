import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Permission } from '../models';

class Group extends Abstract {
  public 'name': string;

  public 'key': string;

  public static override get relationMappings(): RelationMappings {
    return {
      permissions: {
        relation: Model.ManyToManyRelation,
        modelClass: Permission,
        join: {
          from: `${DbTableName.GROUPS}.id`,
          through: {
            from: `${DbTableName.GROUPS_TO_PERMISSIONS}.group_id`,
            to: `${DbTableName.GROUPS_TO_PERMISSIONS}.permission_id`,
          },
          to: `${DbTableName.PERMISSIONS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.GROUPS;
  }
}

export { Group };
