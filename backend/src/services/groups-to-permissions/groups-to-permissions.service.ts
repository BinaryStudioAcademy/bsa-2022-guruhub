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
}

export { GroupsToPermissions };
