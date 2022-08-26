import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Interview, User } from '../models';

class Group extends Abstract {
  public 'note': string;

  public 'interview_id': number;

  public 'created_by_user_id': number;

  public static override get relationMappings(): RelationMappings {
    return {
      interview: {
        relation: Model.HasOneRelation,
        modelClass: Interview,
        join: {
          from: `${DbTableName.INTERVIEW_NOTES}.interview_id`,
          to: `${DbTableName.INTERVIEWS}.id`,
        },
      },
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEW_NOTES}.created_by_user_id`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }
}

export { Group };
