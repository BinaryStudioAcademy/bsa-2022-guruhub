import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { Group as GroupM } from '~/data/models/models';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<GroupM>> {
    const result = await this.#GroupModel.query().page(page, count);

    return {
      items: result.results,
      total: result.total,
    };
  }

  async create(group: { name: string; key: string }): Promise<GroupM> {
    const { name, key } = group;

    return this.#GroupModel.query().insert({
      name,
      key,
    });
  }

  async getByName(name: string): Promise<GroupM | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .first();

    return group ?? null;
  }

  async delete(groupId: number): Promise<number> {
    return await this.#GroupModel.query().delete().where({ id: groupId });
  }
}

export { Group };
