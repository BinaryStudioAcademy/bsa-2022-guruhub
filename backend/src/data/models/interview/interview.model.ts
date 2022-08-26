import { Model, RelationMappings } from 'objection';

import { DbTableName, InterviewStatus } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory } from '../course-category/course-category.model';
import { User } from '../models';

class Interview extends Abstract {
  public 'interviewDate': string | null;

  public 'status': InterviewStatus;

  public 'categoryId': number;

  public 'intervieweeUserId': number;

  public 'interviewerUserId': number;

  public 'courseCategory': CategoryGetAllItemResponseDto;

  public 'interviewer': UsersGetResponseDto | null;

  public 'interviewee': UsersGetResponseDto;

  public static override get relationMappings(): RelationMappings {
    return {
      courseCategory: {
        relation: Model.BelongsToOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.INTERVIEWS}.categoryId`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
      interviewee: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEWS}.intervieweeUserId`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      interviewer: {
        relation: Model.BelongsToOneRelation,
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
