import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsWithPermissionIdsDto,
} from '~/common/types/types';
import { Group as GroupM } from '~/data/models/models';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  public constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  public async getById(id: number): Promise<GroupsWithPermissionIdsDto | null> {
    const group = await this.#GroupModel
      .query()
      .where({ groupId: id })
      .select('groups.*', 'permissions.id as permissions')
      .joinRelated('permissions')
      .castTo<(GroupM & { permissions: number })[]>()
      .then((records) => {
        const permissions: number[] = [];
        records.forEach((record) => {
          permissions.push(record.permissions);
        });

        return {
          ...records[0],
          permissions,
        };
      });

    return group ?? null;
  }

  public async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<GroupM>> {
    const result = await this.#GroupModel.query().page(page, count);

    return {
      items: result.results,
      total: result.total,
    };
  }

  public async create(group: { name: string; key: string }): Promise<GroupM> {
    const { name, key } = group;

    return this.#GroupModel.query().insert({
      name,
      key,
    });
  }

  public async getByName(name: string): Promise<GroupM | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .first();

    return group ?? null;
  }

  public async delete(groupId: number): Promise<number> {
    return this.#GroupModel.query().delete().where({ id: groupId });
  }
}

export { Group };
