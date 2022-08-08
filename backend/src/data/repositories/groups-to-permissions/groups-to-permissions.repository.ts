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
    isAllowed: boolean;
  }): Promise<GroupsToPermissionsM> {
    const { groupId, permissionId, isAllowed } = groupsToPermissions;

    return this.#GroupsToPermissionsModel.query().insert({
      group_id: groupId,
      permission_id: permissionId,
      is_allowed: isAllowed,
    });
  }
}

export { GroupsToPermissions };
