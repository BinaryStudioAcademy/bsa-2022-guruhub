import { Model, RelationMappings } from 'objection';

import { DbTableName, UserGender } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { User } from '../models';

class UserDetails extends Abstract {
  public 'fullName': string;

  public 'gender': UserGender | null;

  public 'avatarUrl': string | null;

  public 'dateOfBirth': string | null;

  public 'userId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.USER_DETAILS}.userId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.USER_DETAILS;
  }
}

export { UserDetails };
