import { Model, RelationMappings } from 'objection';

import { ChatMessageStatus, DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { User } from '../models';

class ChatMessage extends Abstract {
  public 'message': string;

  public 'chatId': string;

  public 'senderId': number;

  public 'receiverId': number;

  public 'status': ChatMessageStatus;

  public static override get relationMappings(): RelationMappings {
    return {
      sender: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.CHAT_MESSAGES}.senderId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      receiver: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.CHAT_MESSAGES}.receiverId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.CHAT_MESSAGES;
  }
}

export { ChatMessage };
