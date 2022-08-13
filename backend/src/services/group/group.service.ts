import { ExceptionMessage, StringCase } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsCreateRequestDto,
  GroupsItemResponseDto,
} from '~/common/types/types';
import { group as groupsRep } from '~/data/repositories/repositories';
import { GroupsError } from '~/exceptions/exceptions';
import { changeStringCase } from '~/helpers/helpers';
import {
  groupsToPermissions as groupsToPermissionsServ,
  permission as permissionServ,
  user as userServ,
  usersToGroups as usersToGroupsServ,
} from '~/services/services';

type Constructor = {
  groupsRepository: typeof groupsRep;
  permissionService: typeof permissionServ;
  groupsToPermissionsService: typeof groupsToPermissionsServ;
  usersToGroupsService: typeof usersToGroupsServ;
  userService: typeof userServ;
};

class Group {
  #groupsRepository: typeof groupsRep;
  #permissionService: typeof permissionServ;
  #groupsToPermissionsService: typeof groupsToPermissionsServ;
  #usersToGroupsService: typeof usersToGroupsServ;
  #userService: typeof userServ;

  constructor({
    groupsRepository,
    permissionService,
    groupsToPermissionsService,
    usersToGroupsService,
    userService,
  }: Constructor) {
    this.#groupsRepository = groupsRepository;
    this.#permissionService = permissionService;
    this.#groupsToPermissionsService = groupsToPermissionsService;
    this.#usersToGroupsService = usersToGroupsService;
    this.#userService = userService;
  }

  async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<GroupsItemResponseDto>
  > {
    const ZERO_INDEXED_PAGE = page - 1;
    const result = await this.#groupsRepository.getPaginated({
      page: ZERO_INDEXED_PAGE,
      count,
    });

    return {
      items: result.items.map((group) => ({
        id: group.id,
        name: group.name,
        key: group.key,
      })),
      total: result.total,
    };
  }

  async create(
    groupsRequestDto: GroupsCreateRequestDto,
  ): Promise<GroupsItemResponseDto> {
    const { name, permissionIds, userIds } = groupsRequestDto;
    const groupByName = await this.#groupsRepository.getByName(name);

    if (groupByName) {
      throw new GroupsError();
    }
    const permissions = await this.#permissionService.getByIds(permissionIds);

    if (permissions.items.length !== permissionIds.length) {
      throw new GroupsError({
        message: ExceptionMessage.INVALID_GROUP_PERMISSIONS,
      });
    }

    if (userIds) {
      const users = await this.#userService.getByIds(userIds);

      if (users.length !== userIds.length) {
        throw new GroupsError({
          message: ExceptionMessage.INVALID_GROUP_USERS,
        });
      }
    }
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

  async delete(id: number): Promise<boolean> {
    const deletedGroupsCount = await this.#groupsRepository.delete(id);

    return Boolean(deletedGroupsCount);
  }
}

export { Group };
