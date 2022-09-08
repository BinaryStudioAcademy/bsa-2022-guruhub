import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { User } from '../models';

class Transaction extends Abstract {
  public 'status': string;

  public 'amount': number;

  public 'senderId': number;

  public 'receiverId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.TRANSACTIONS}.senderId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.TRANSACTIONS}.receiverId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.TRANSACTIONS;
  }
}

export { Transaction };
