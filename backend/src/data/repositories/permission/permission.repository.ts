import { Permission as PermissionM } from '~/data/models/models';

type Constructor = {
  PermissionModel: typeof PermissionM;
};

class Permission {
  #PermissionModel: typeof PermissionM;

  public constructor({ PermissionModel }: Constructor) {
    this.#PermissionModel = PermissionModel;
  }

  public async getAll(): Promise<PermissionM[]> {
    return this.#PermissionModel.query();
  }

  public async getByIds(ids: number[]): Promise<PermissionM[]> {
    const permissions = await this.#PermissionModel.query().findByIds(ids);

    return permissions;
  }
}

export { Permission };
