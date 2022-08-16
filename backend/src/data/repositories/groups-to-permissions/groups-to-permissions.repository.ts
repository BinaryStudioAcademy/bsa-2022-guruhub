import { GroupsToPermissions as GroupsToPermissionsM } from '~/data/models/models';

type Constructor = {
  GroupsToPermissionsModel: typeof GroupsToPermissionsM;
};

class GroupsToPermissions {
  #GroupsToPermissionsModel: typeof GroupsToPermissionsM;

  public constructor({ GroupsToPermissionsModel }: Constructor) {
    this.#GroupsToPermissionsModel = GroupsToPermissionsModel;
  }

  public async create(groupsToPermissions: {
    groupId: number;
    permissionId: number;
  }): Promise<GroupsToPermissionsM> {
    const { groupId, permissionId } = groupsToPermissions;

    return this.#GroupsToPermissionsModel.query().insert({
      groupId,
      permissionId,
    });
  }

  public update(groupsToPermissions: {
    groupId: number;
    permissionIds: number[];
  }): void {
    const { groupId, permissionIds } = groupsToPermissions;

    this.#GroupsToPermissionsModel
      .query()
      .where({ groupId })
      .whereNotIn('permission_id', permissionIds)
      .delete()
      .execute();

    permissionIds.map((permissionId: number) => {
      return this.#GroupsToPermissionsModel
        .query()
        .insert({
          groupId,
          permissionId,
        })
        .onConflict(['permission_id', 'group_id'])
        .ignore()
        .execute();
    });
  }
}

export { GroupsToPermissions };
