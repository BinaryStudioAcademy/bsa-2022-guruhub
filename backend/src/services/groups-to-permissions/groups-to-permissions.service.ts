import { GroupsToPermissionsResponseDto } from '~/common/types/types';
import { groupsToPermissions as groupsToPermissionsRep } from '~/data/repositories/repositories';
import { groupsPermissionsModelToDto } from '~/mapper/groups-to-permissions/groups-to-permissions.mapper';

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
    isAllowed: boolean;
  }): Promise<GroupsToPermissionsResponseDto> {
    const model = await this.#groupsToPermissionsRepository.create(
      groupsToPermissions,
    );
    return groupsPermissionsModelToDto(model);
  }
}

export { GroupsToPermissions };
