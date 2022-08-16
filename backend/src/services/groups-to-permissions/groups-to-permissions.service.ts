import { GroupsToPermissionsResponseDto } from '~/common/types/types';
import { groupsToPermissions as groupsToPermissionsRep } from '~/data/repositories/repositories';

type Constructor = {
  groupsToPermissionsRepository: typeof groupsToPermissionsRep;
};

class GroupsToPermissions {
  #groupsToPermissionsRepository: typeof groupsToPermissionsRep;

  public constructor({ groupsToPermissionsRepository }: Constructor) {
    this.#groupsToPermissionsRepository = groupsToPermissionsRepository;
  }

  public async createGroupsToPermissions(groupsToPermissions: {
    groupId: number;
    permissionId: number;
  }): Promise<GroupsToPermissionsResponseDto> {
    const model = await this.#groupsToPermissionsRepository.create(
      groupsToPermissions,
    );

    return {
      id: model.id,
      groupId: model.groupId,
      permissionId: model.permissionId,
    };
  }

  async getPermissionsByGroupId(
    groupId: number,
  ): Promise<GroupsToPermissionsResponseDto[]> {
    const permissions = await this.#groupsToPermissionsRepository.getByGroupId(
      groupId,
    );

    return permissions;
  }

  async updatePermissionsByGroupId(groupsToPermissions: {
    groupId: number;
    permissionIds: number[];
  }): Promise<void> {
    const { groupId, permissionIds } = groupsToPermissions;

    return this.#groupsToPermissionsRepository.update({
      groupId,
      permissionIds,
    });
  }

  async delete(id: number): Promise<boolean> {
    const deleteGroupPermission =
      await this.#groupsToPermissionsRepository.delete(id);

    return Boolean(deleteGroupPermission);
  }
}

export { GroupsToPermissions };
