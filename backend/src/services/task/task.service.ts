import { ExceptionMessage, TaskStatus } from '~/common/enums/enums';
import {
  TaskGetByMenteeIdAndModuleId,
  TaskGetItemReponseDto,
  TaskManipulateRequestArgumentsDto,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetItemResponseDto,
} from '~/common/types/types';
import { task as taskRep } from '~/data/repositories/repositories';
import { TasksError } from '~/exceptions/exceptions';

import { taskNote as taskNoteServ } from '../services';

type Constructor = {
  taskRepository: typeof taskRep;
  taskNoteService: typeof taskNoteServ;
};

class Task {
  #taskRepository: typeof taskRep;

  #taskNoteService: typeof taskNoteServ;

  public constructor({ taskRepository, taskNoteService }: Constructor) {
    this.#taskRepository = taskRepository;
    this.#taskNoteService = taskNoteService;
  }

  public async manipulate({
    note,
    taskId,
    authorId,
    status,
  }: TaskManipulateRequestArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    await this.checkIsChangeable(taskId);

    const newNote = await this.createNote({
      authorId,
      note,
      taskId,
      status,
    });

    await this.updateStatus(taskId, status);

    return newNote;
  }

  public createNote({
    authorId,
    note,
    taskId,
    status,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#taskNoteService.create({ authorId, note, taskId, status });
  }

  public updateStatus(
    taskId: number,
    status: TaskStatus,
  ): Promise<TaskGetItemReponseDto> {
    return this.#taskRepository.updateStatus(taskId, status);
  }

  public getById(taskId: number): Promise<TaskGetItemReponseDto | null> {
    return this.#taskRepository.getById(taskId);
  }

  public getByMenteeIdAndModuleId({
    moduleId,
    menteeId,
  }: TaskGetByMenteeIdAndModuleId): Promise<TaskGetItemReponseDto | null> {
    return this.#taskRepository.getByMenteeIdAndModuleId({
      moduleId,
      menteeId,
    });
  }

  private async checkIsChangeable(taskId: number): Promise<void> {
    const task = await this.getById(taskId);

    if (!task) {
      throw new TasksError();
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new TasksError({
        message: ExceptionMessage.TASK_COMPLETED,
      });
    }
  }
}

export { Task };
