import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Group, Interview } from '../models';

class User extends Abstract {
  public 'email': string;

  public 'fullName': string;

  public 'passwordHash': string;

  public 'passwordSalt': string;

  public static override get relationMappings(): RelationMappings {
    return {
      groups: {
        relation: Model.ManyToManyRelation,
        modelClass: Group,
        join: {
          from: `${DbTableName.USERS}.id`,
          through: {
            from: `${DbTableName.USERS_TO_GROUPS}.user_id`,
            to: `${DbTableName.USERS_TO_GROUPS}.group_id`,
          },
          to: `${DbTableName.GROUPS}.id`,
        },
      },
      interviewee: {
        relation: Model.HasManyRelation,
        modelClass: Interview,
        join: {
          from: `${DbTableName.USERS}.id`,
          to: `${DbTableName.INTERVIEWS}.interviewee_user_id`,
        },
      },
      interviewer: {
        relation: Model.HasManyRelation,
        modelClass: Interview,
        join: {
          from: `${DbTableName.USERS}.id`,
          to: `${DbTableName.INTERVIEWS}.interviewer_user_id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.USERS;
  }
}

export { User };
