import { Model, RelationMappings } from 'objection';

import { DbTableName } from '~/common/enums/enums';
import {
  CategoryGetAllItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

import { Abstract } from '../abstract/abstract.model';
import { CourseCategory } from '../course-category/course-category.model';
import { User } from '../models';

class Interview extends Abstract {
  public 'interviewDate': string;

  public 'status': string;

  public 'interviewerUserId': number;

  public 'courseCategory': CategoryGetAllItemResponseDto;

  public 'interviewer'?: UsersGetResponseDto;

  public 'interviewee'?: UsersGetResponseDto;

  public static override get relationMappings(): RelationMappings {
    return {
      courseCategory: {
        relation: Model.HasOneRelation,
        modelClass: CourseCategory,
        join: {
          from: `${DbTableName.INTERVIEWS}.category_id`,
          to: `${DbTableName.COURSE_CATEGORIES}.id`,
        },
      },
      interviewee: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEWS}.interviewee_user_id`,
          to: `${DbTableName.USERS}.id`,
        },
      },
      interviewer: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: `${DbTableName.INTERVIEWS}.interviewer_user_id`,
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
