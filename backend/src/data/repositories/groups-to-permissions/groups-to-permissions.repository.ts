import { GroupsToPermissions as GroupsToPermissionsM } from '~/data/models/models';

type Constructor = {
  GroupsToPermissionsModel: typeof GroupsToPermissionsM;
};

class GroupsToPermissions {
  #GroupsToPermissionsModel: typeof GroupsToPermissionsM;

  constructor({ GroupsToPermissionsModel }: Constructor) {
    this.#GroupsToPermissionsModel = GroupsToPermissionsModel;
  }

  async create(groupsToPermissions: {
    groupId: number;
    permissionId: number;
  }): Promise<GroupsToPermissionsM> {
    const { groupId, permissionId } = groupsToPermissions;

    return this.#GroupsToPermissionsModel.query().insert({
      groupId,
      permissionId,
    });
  }

  async getByGroupId(groupId: number): Promise<GroupsToPermissionsM[]> {
    return this.#GroupsToPermissionsModel.query().where({ groupId }).select();
  }

  async delete(id: number): Promise<number> {
    return this.#GroupsToPermissionsModel.query().delete().where({ id });
  }
}

export { GroupsToPermissions };
