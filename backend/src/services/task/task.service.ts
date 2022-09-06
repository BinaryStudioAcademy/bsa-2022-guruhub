import { ExceptionMessage, TaskStatus } from '~/common/enums/enums';
import {
  EntityPagination,
  TaskGetByMenteeIdAndModuleId,
  TaskGetByMenteeIdCourseIdModuleIdRequestDto,
  TaskGetItemReponseDto,
  TaskManipulateRequestArgumentsDto,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetAllArgumentsDto,
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
    const task = await this.getById(taskId);

    if (!task) {
      throw new TasksError();
    }

    if (task.status === TaskStatus.COMPLETED) {
      throw new TasksError({
        message: ExceptionMessage.TASK_COMPLETED,
      });
    }

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

  public async getByMenteeIdAndModuleId({
    moduleId,
    menteeId,
  }: TaskGetByMenteeIdAndModuleId): Promise<TaskGetItemReponseDto | null> {
    const task = await this.#taskRepository.getByMenteeIdAndModuleId({
      moduleId,
      menteeId,
    });

    return task;
  }

  public async getByMenteeIdCourseIdModuleId({
    courseId,
    menteeId,
    moduleId,
  }: TaskGetByMenteeIdCourseIdModuleIdRequestDto): Promise<TaskGetItemReponseDto> {
    const task = await this.#taskRepository.getByMenteeIdCourseIdModuleId({
      courseId,
      menteeId,
      moduleId,
    });

    if (!task) {
      throw new TasksError();
    }

    return task;
  }

  public getAllNotes({
    count,
    page,
    taskId,
  }: TaskNoteGetAllArgumentsDto): Promise<
    EntityPagination<TaskNoteGetItemResponseDto>
  > {
    return this.#taskNoteService.getAll({ count, page, taskId });
  }
}

export { Task };
