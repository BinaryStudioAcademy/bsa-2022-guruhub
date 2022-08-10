import { StringCase } from '~/common/enums/enums';
import {
  GroupsCreateRequestDto,
  GroupsResponseDto,
} from '~/common/types/types';
import { group as groupsRep } from '~/data/repositories/repositories';
import { changeStringCase } from '~/helpers/helpers';
import {
  groupsToPermissions as groupsToPermissionsServ,
  permission as permissionServ,
  usersToGroups as usersToGroupsServ,
} from '~/services/services';

type Constructor = {
  groupsRepository: typeof groupsRep;
  permissionService: typeof permissionServ;
  groupsToPermissionsService: typeof groupsToPermissionsServ;
  usersToGroupsService: typeof usersToGroupsServ;
};

class Group {
  #groupsRepository: typeof groupsRep;
  #permissionService: typeof permissionServ;
  #groupsToPermissionsService: typeof groupsToPermissionsServ;
  #usersToGroupsService: typeof usersToGroupsServ;

  constructor({
    groupsRepository,
    permissionService,
    groupsToPermissionsService,
    usersToGroupsService,
  }: Constructor) {
    this.#groupsRepository = groupsRepository;
    this.#permissionService = permissionService;
    this.#groupsToPermissionsService = groupsToPermissionsService;
    this.#usersToGroupsService = usersToGroupsService;
  }

  async create(
    groupsRequestDto: GroupsCreateRequestDto,
  ): Promise<GroupsResponseDto> {
    const { name, permissionIds, userIds } = groupsRequestDto;
    const group = await this.#groupsRepository.create({
      name,
      key: changeStringCase({
        stringToChange: name,
        caseType: StringCase.SNAKE_CASE,
      }),
    });

    if (userIds) {
      await Promise.all(
        userIds.map((userId: number) => {
          return this.#usersToGroupsService.createUsersToGroups({
            groupId: group.id,
            userId: userId,
          });
        }),
      );
    }
    await Promise.all(
      permissionIds.map((it: number) => {
        return this.#groupsToPermissionsService.createGroupsToPermissions({
          groupId: group.id,
          permissionId: it,
        });
      }),
    );

    return group;
  }
}

export { Group };
