import { Model, RelationMappings } from 'objection';
import { Course, User } from 'src/data/models/models';

import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

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
          from: `${DbTableName.MENTEES_TO_MENTORS}.course_id`,
          to: `${DbTableName.COURSES}.id`,
        },
      },
      mentee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.MENTEES_TO_MENTORS}.mentee_id`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      mentor: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.MENTEES_TO_MENTORS}.mentor_id`,
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
