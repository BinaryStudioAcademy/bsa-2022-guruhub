import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Interview, User } from '../models';

class InterviewNote extends Abstract {
  public 'note': string;

  public 'interviewId': number;

  public 'authorId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      interview: {
        relation: Model.BelongsToOneRelation,
        modelClass: Interview,
        join: {
          from: `${DbTableName.INTERVIEW_NOTES}.interview_id`,
          to: `${DbTableName.INTERVIEWS}.id`,
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEW_NOTES}.author_id`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.INTERVIEW_NOTES;
  }
}

export { InterviewNote };
