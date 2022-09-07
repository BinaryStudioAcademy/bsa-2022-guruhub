import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class CoursesToMentors extends Abstract {
  public 'userId': number;

  public 'courseId': number;

  public 'maxStudentsCount': number;

  public static override get tableName(): string {
    return DbTableName.COURSES_TO_MENTORS;
  }
}

export { CoursesToMentors };
