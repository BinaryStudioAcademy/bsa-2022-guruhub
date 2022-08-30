import { Model, RelationMappings } from 'objection';

import { DbTableName, TaskStatus } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { User } from '../models';

class TaskNote extends Abstract {
  public 'note': string;

  public 'taskId': number;

  public 'authorId': number;

  public 'status': TaskStatus;

  public static override get relationMappings(): RelationMappings {
    return {
      author: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.TASK_NOTES}.authorId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.TASK_NOTES;
  }
}

export { TaskNote };
