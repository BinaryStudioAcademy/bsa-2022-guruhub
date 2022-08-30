import { TaskStatus } from '~/common/enums/enums';
import { TaskGetItemReponseDto } from '~/common/types/types';
import { task as taskRep } from '~/data/repositories/repositories';

type Constructor = {
  taskRepository: typeof taskRep;
};

class Task {
  #taskRepository: typeof taskRep;

  public constructor({ taskRepository }: Constructor) {
    this.#taskRepository = taskRepository;
  }

  public updateStatus(
    taskId: number,
    status: TaskStatus,
  ): Promise<TaskGetItemReponseDto> {
    return this.#taskRepository.updateStatus(taskId, status);
  }
}

export { Task };
