import { Permission as PermissionM } from '~/data/models/models';

type Constructor = {
  PermissionModel: typeof PermissionM;
};

class Permission {
  #PermissionModel: typeof PermissionM;

  constructor({ PermissionModel }: Constructor) {
    this.#PermissionModel = PermissionModel;
  }

  async getAll(): Promise<PermissionM[]> {
    return this.#PermissionModel.query();
  }

  async getByIds(ids: number[]): Promise<PermissionM[]> {
    const permissions = await this.#PermissionModel.query().findByIds(ids);

    return permissions;
  }
}

export { Permission };
