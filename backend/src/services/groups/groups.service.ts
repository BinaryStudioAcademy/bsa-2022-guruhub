import { GroupsRequestDto, GroupsResponseDto } from '~/common/types/types';
import {
  permission as permissionServ,
  groupsToPermissions as groupsToPermissionsServ,
} from '~/services/services';
import { groups as groupsRep } from '~/data/repositories/repositories';

type Constructor = {
  groupsRepository: typeof groupsRep;
  permissionService: typeof permissionServ;
  groupsToPermissionsService: typeof groupsToPermissionsServ;
};

class Groups {
  #groupsRepository: typeof groupsRep;
  #permissionService: typeof permissionServ;
  #groupsToPermissionsService: typeof groupsToPermissionsServ;

  constructor({
    groupsRepository,
    permissionService,
    groupsToPermissionsService,
  }: Constructor) {
    this.#groupsRepository = groupsRepository;
    this.#permissionService = permissionService;
    this.#groupsToPermissionsService = groupsToPermissionsService;
  }

  async createGroup(
    groupsRequestDto: GroupsRequestDto,
  ): Promise<GroupsResponseDto> {
    const { permissionIds } = groupsRequestDto;
    const permissions = await this.#permissionService.getPermissions();
    const group = await this.#groupsRepository.create(groupsRequestDto);

    await Promise.all(
      permissions.map(async (permission) => {
        await this.#groupsToPermissionsService.createGroupsToPermissions({
          groupId: group.id,
          permissionId: permission.id,
          isAllowed: permissionIds.includes(permission.id),
        });
      }),
    );

    return { ...group };
  }
}

export { Groups };
