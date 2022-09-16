import { Page } from 'objection';

import { SortOrder } from '~/common/enums/enums';
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
  #TaskNoteModel: typeof TaskNoteM;

  public constructor({ TaskNoteModel }: Constructor) {
    this.#TaskNoteModel = TaskNoteModel;
  }

  public async getAll({
    count,
    page,
    taskId,
  }: TaskNoteGetAllArgumentsDto): Promise<
    EntityPagination<TaskNoteGetItemResponseDto>
  > {
    const { results, total } = await this.#TaskNoteModel
      .query()
      .where({ taskId })
      .withGraphFetched(
        'author(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .orderBy('createdAt', SortOrder.DESC)
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
    return this.#TaskNoteModel
      .query()
      .insert({ authorId, taskId, note, status })
      .withGraphFetched(
        'author(withoutPassword).[userDetails(withoutMoneyBalance).[avatar]]',
      )
      .castTo<TaskNoteGetItemResponseDto>()
      .execute();
  }
}

export { TaskNote };
