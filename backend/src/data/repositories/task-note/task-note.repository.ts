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
    const elementsToSkip = page * count;
    const results = await this.#TaskNodeModel
      .query()
      .where({ taskId })
      .withGraphJoined('author(withoutPassword).[userDetails]')
      .castTo<TaskNoteGetItemResponseDto[]>()
      .offset(elementsToSkip)
      .limit(count);

    const total = await this.#TaskNodeModel.query().where({ taskId });

    return {
      items: results,
      total: total.length,
    };
  }

  public create({
    authorId,
    taskId,
    note,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteGetItemResponseDto> {
    return this.#TaskNodeModel
      .query()
      .insert({ authorId, taskId, note })
      .withGraphJoined('author(withoutPassword).[userDetails]')
      .castTo<TaskNoteGetItemResponseDto>()
      .execute();
  }
}

export { TaskNote };
