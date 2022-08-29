import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { Course, User } from '../models';

class MenteesToMentors extends Abstract {
  public 'courseId': number;

  public 'mentorId': number;

  public 'menteeId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      course: {
        relation: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: `${DbTableName.MENTEES_TO_MENTORS}.courseId`,
          to: `${DbTableName.COURSES}.id`,
        },
      },
      mentee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.MENTEES_TO_MENTORS}.menteeId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      mentor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.MENTEES_TO_MENTORS}.mentorId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.MENTEES_TO_MENTORS;
  }
}

export { MenteesToMentors };
