import { TaskStatus } from '~/common/enums/enums';
import { Task as TaskM } from '~/data/models/models';

type Constructor = {
  TaskModel: typeof TaskM;
};

class Task {
  #TaskModel: typeof TaskM;

  public constructor({ TaskModel }: Constructor) {
    this.#TaskModel = TaskModel;
  }

  public updateStatus(taskId: number, status: TaskStatus): Promise<TaskM> {
    return this.#TaskModel
      .query()
      .patchAndFetchById(taskId, { status })
      .execute();
  }
}

export { Task };
