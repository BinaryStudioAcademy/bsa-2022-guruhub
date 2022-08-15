import { GroupsToPermissionsResponseDto } from '~/common/types/types';
import { groupsToPermissions as groupsToPermissionsRep } from '~/data/repositories/repositories';

type Constructor = {
  groupsToPermissionsRepository: typeof groupsToPermissionsRep;
};

class GroupsToPermissions {
  #groupsToPermissionsRepository: typeof groupsToPermissionsRep;

  constructor({ groupsToPermissionsRepository }: Constructor) {
    this.#groupsToPermissionsRepository = groupsToPermissionsRepository;
  }

  async createGroupsToPermissions(groupsToPermissions: {
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
    const groupPrermissions = await this.getPermissionsByGroupId(groupId);
    const dbPermissionIds = groupPrermissions.map(
      (permission) => permission.permissionId,
    );

    const permissionsToCreate = permissionIds.filter((id: number) => {
      return !dbPermissionIds.includes(id);
    });
    const permissionsToDelete = groupPrermissions.filter(
      (permission: GroupsToPermissionsResponseDto) => {
        return !permissionIds.includes(permission.permissionId);
      },
    );

    await Promise.all(
      permissionsToCreate.map((permissionId: number) => {
        return this.createGroupsToPermissions({
          groupId,
          permissionId,
        });
      }),
    );

    await Promise.all(
      permissionsToDelete.map((permission: GroupsToPermissionsResponseDto) => {
        return this.delete(permission.id);
      }),
    );
  }

  async delete(id: number): Promise<boolean> {
    const deleteGroupPermission =
      await this.#groupsToPermissionsRepository.delete(id);

    return Boolean(deleteGroupPermission);
  }
}

export { GroupsToPermissions };
