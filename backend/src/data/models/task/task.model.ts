import { DbTableName, TaskStatus } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class Task extends Abstract {
  public 'status': TaskStatus;

  public 'menteesToMentorsId': number;

  public 'moduleId': number;

  public static override get tableName(): string {
    return DbTableName.TASKS;
  }
}

export { Task };
