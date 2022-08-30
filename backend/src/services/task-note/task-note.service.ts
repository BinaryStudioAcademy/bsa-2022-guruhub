import {
  EntityPagination,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetAllArgumentsDto,
  TaskNoteGetItemResponseDto,
} from '~/common/types/types';
import { taskNote as taskNoteRep } from '~/data/repositories/repositories';

type Constructor = {
  taskNoteRepository: typeof taskNoteRep;
};

class TaskNote {
  #taskNoteRepository: typeof taskNoteRep;

  public constructor({ taskNoteRepository }: Constructor) {
    this.#taskNoteRepository = taskNoteRepository;
  }

  public getAll({
    count,
    page,
    taskId,
  }: TaskNoteGetAllArgumentsDto): Promise<
    EntityPagination<TaskNoteGetItemResponseDto>
  > {
    const zeroIndexedPage = page - 1;

    return this.#taskNoteRepository.getAll({
      count,
      page: zeroIndexedPage,
      taskId,
    });
  }

  public create({
    authorId,
    note,
    taskId,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#taskNoteRepository.create({ authorId, note, taskId });
  }
}

export { TaskNote };
