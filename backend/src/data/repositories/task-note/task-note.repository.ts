import {
  EntityPagination,
  TaskNoteCreateArgumentsDto,
  TaskNoteGetAllArgumentsDto,
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
  }: TaskNoteGetAllArgumentsDto): Promise<EntityPagination<TaskNoteM>> {
    const { results, total } = await this.#TaskNodeModel
      .query()
      .where({ taskId })
      .withGraphFetched('author(withoutPassword).[userDetails]')
      .page(page, count);

    return {
      items: results,
      total,
    };
  }

  public create({
    authorId,
    taskId,
    note,
  }: TaskNoteCreateArgumentsDto): Promise<TaskNoteM> {
    return this.#TaskNodeModel
      .query()
      .insert({ authorId, taskId, note })
      .execute();
  }
}

export { TaskNote };
