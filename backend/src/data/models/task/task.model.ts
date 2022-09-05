import { Model, RelationMappings } from 'objection';

import { DbTableName, TaskStatus } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { MenteesToMentors } from '../models';

class Task extends Abstract {
  public 'status': TaskStatus;

  public 'menteesToMentorsId': number;

  public 'moduleId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      menteesToMentors: {
        relation: Model.BelongsToOneRelation,
        modelClass: MenteesToMentors,
        join: {
          from: `${DbTableName.TASKS}.menteesToMentorsId`,
          to: `${DbTableName.MENTEES_TO_MENTORS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.TASKS;
  }
}

export { Task };
