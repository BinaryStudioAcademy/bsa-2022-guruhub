import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
} from '~/common/types/types';
import { Permission as PermissionM } from '~/data/models/models';

type Constructor = {
  PermissionModel: typeof PermissionM;
};

class Permission {
  #PermissionModel: typeof PermissionM;

  public constructor({ PermissionModel }: Constructor) {
    this.#PermissionModel = PermissionModel;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<EntityPagination<PermissionM>> {
    const result = await this.#PermissionModel
      .query()
      .orderBy('id', 'asc')
      .page(page, count);

    return {
      items: result.results,
      total: result.total,
    };
  }

  public async getByIds(ids: number[]): Promise<PermissionM[]> {
    const permissions = await this.#PermissionModel.query().findByIds(ids);

    return permissions;
  }
}

export { Permission };
