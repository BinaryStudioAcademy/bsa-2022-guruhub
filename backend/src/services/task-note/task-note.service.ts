import {
  EntityPagination,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetAllArgumentsDto,
  TaskNoteGetItemResponseDto,
} from '~/common/types/types';
import { taskNote as taskNoteRep } from '~/data/repositories/repositories';
import { convertPageToZeroIndexed, sanitizeHTML } from '~/helpers/helpers';

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
    const zeroIndexedPage = convertPageToZeroIndexed(page);

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
    status,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#taskNoteRepository.create({
      authorId,
      note: sanitizeHTML(note),
      taskId,
      status,
    });
  }
}

export { TaskNote };
