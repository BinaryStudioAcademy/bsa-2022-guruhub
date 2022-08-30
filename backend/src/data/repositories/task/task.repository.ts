import { TaskStatus } from '~/common/enums/enums';
import { TaskGetByMenteeIdAndModuleId } from '~/common/types/types';
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

  public async getById(id: number): Promise<TaskM | null> {
    const task = await this.#TaskModel.query().findById(id);

    return task ?? null;
  }

  public async getByMenteeIdAndModuleId({
    moduleId,
    menteeId,
  }: TaskGetByMenteeIdAndModuleId): Promise<TaskM | null> {
    const task = await this.#TaskModel
      .query()
      .where('tasks.moduleId', moduleId)
      .andWhere('menteesToMentors.menteeId', menteeId)
      .withGraphFetched('menteesToMentors')
      .first();

    return task ?? null;
  }
}

export { Task };
