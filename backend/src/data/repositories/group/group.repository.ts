import { SortOrder } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsWithPermissionIdsDto,
  GroupsWithPermissionsDto,
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
      .where('groups.id', id)
      .select('groups.*')
      .withGraphJoined('permissions')
      .castTo<GroupsWithPermissionsDto>()
      .first()
      .then((data) => {
        if (!data) {
          return null;
        }

        return {
          ...data,
          permissionIds: data.permissions.map((permission) => permission.id),
        };
      });

    return group ?? null;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<GroupM>> {
    const result = await this.#GroupModel
      .query()
      .orderBy('id', SortOrder.ASC)
      .page(page, count);

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

  public update(group: {
    id: number;
    name: string;
    key: string;
  }): Promise<GroupM> {
    const { id, name, key } = group;

    return this.#GroupModel
      .query()
      .patchAndFetchById(id, {
        name,
        key,
      })
      .execute();
  }

  public delete(groupId: number): Promise<number> {
    return this.#GroupModel.query().delete().where({ id: groupId }).execute();
  }

  public async getByKey(key: string): Promise<GroupM | null> {
    const group = await this.#GroupModel.query().where({ key }).first();

    return group ?? null;
  }
}

export { Group };
