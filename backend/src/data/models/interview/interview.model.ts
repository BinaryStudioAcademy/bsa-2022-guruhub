import { Model, RelationMappings } from 'objection';

import { DbTableName, InterviewStatus } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory } from '../course-category/course-category.model';
import { User } from '../models';

class Interview extends Abstract {
  public 'interviewDate': string | null;

  public 'status': InterviewStatus;

  public 'categoryId': number;

  public 'intervieweeUserId': number;

  public 'interviewerUserId': number;

  public static override get relationMappings(): RelationMappings {
    return {
      courseCategory: {
        relation: Model.HasOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.INTERVIEWS}.categoryId`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
      interviewee: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEWS}.intervieweeUserId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      interviewer: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEWS}.interviewerUserId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
    };
  }

  public static override get tableName(): string {
    return DbTableName.INTERVIEWS;
  }
}

export { Interview };
