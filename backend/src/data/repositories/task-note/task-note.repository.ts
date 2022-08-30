import { Page } from 'objection';

import {
  EntityPagination,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetAllArgumentsDto,
  TaskNoteGetItemResponseDto,
} from '~/common/types/types';
import { TaskNote as TaskNoteM } from '~/data/models/models';

type Constructor = {
  TaskNoteModel: typeof TaskNoteM;
};

class TaskNote {
  #TaskNodeModel: typeof TaskNoteM;

  public constructor({ TaskNoteModel }: Constructor) {
    this.#TaskNodeModel = TaskNoteModel;
  }

  public async getAll({
    count,
    page,
    taskId,
  }: TaskNoteGetAllArgumentsDto): Promise<
    EntityPagination<TaskNoteGetItemResponseDto>
  > {
    const { results, total } = await this.#TaskNodeModel
      .query()
      .where({ taskId })
      .withGraphFetched('author(withoutPassword).[userDetails]')
      .page(page, count)
      .castTo<Page<TaskNoteM & TaskNoteGetItemResponseDto>>();

    return {
      items: results,
      total,
    };
  }

  public create({
    authorId,
    taskId,
    note,
    status,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#TaskNodeModel
      .query()
      .insert({ authorId, taskId, note, status })
      .withGraphFetched('author(withoutPassword).[userDetails]')
      .castTo<TaskNoteGetItemResponseDto>()
      .execute();
  }
}

export { TaskNote };
