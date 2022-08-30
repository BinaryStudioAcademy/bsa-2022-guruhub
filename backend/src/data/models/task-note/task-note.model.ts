import { DbTableName } from '~/common/enums/enums';

import { Abstract } from '../abstract/abstract.model';

class TaskNote extends Abstract {
  public 'note': string;

  public 'taskId': number;

  public 'authorId': number;

  public static override get tableName(): string {
    return DbTableName.TASK_NOTES;
  }
}

export { TaskNote };
