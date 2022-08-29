import { ExceptionMessage, StringCase } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsConfigureRequestDto,
  GroupsGetByIdResponseDto,
  GroupsItemResponseDto,
  GroupsUpdateRequestDto,
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

  public constructor({
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

  public async getById(id: number): Promise<GroupsGetByIdResponseDto | null> {
    const groupWithPermissions = await this.#groupsRepository.getById(id);

    if (!groupWithPermissions) {
      throw new GroupsError({ message: ExceptionMessage.INVALID_GROUP_ID });
    }

    const users = await this.#usersToGroupsService.getUsersByGroupId(id);
    const userIds = users?.map((user) => user.userId) ?? [];

    return {
      ...groupWithPermissions,
      userIds,
    };
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<GroupsItemResponseDto>
  > {
    const zeroIndexPage = page - 1;
    const result = await this.#groupsRepository.getAll({
      page: zeroIndexPage,
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

  public async create(
    groupsRequestDto: GroupsConfigureRequestDto,
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

  public async update(data: {
    id: number;
    groupsRequestDto: GroupsUpdateRequestDto;
  }): Promise<GroupsItemResponseDto> {
    const { id, groupsRequestDto } = data;
    const { name, permissionIds, userIds } = groupsRequestDto;

    const group = await this.#groupsRepository
      .update({
        id,
        name,
        key: changeStringCase({
          stringToChange: name,
          caseType: StringCase.SNAKE_CASE,
        }),
      })
      .catch(() => {
        throw new GroupsError();
      });

    await this.#groupsToPermissionsService
      .updateGroupsToPermissions({
        groupId: id,
        permissionIds,
      })
      .catch(() => {
        throw new GroupsError({
          message: ExceptionMessage.INVALID_GROUP_PERMISSIONS,
        });
      });

    await this.#usersToGroupsService
      .updateUsersToGroups({
        groupId: id,
        userIds,
      })
      .catch(() => {
        throw new GroupsError({
          message: ExceptionMessage.INVALID_GROUP_USERS,
        });
      });

    return group;
  }

  public async delete(id: number): Promise<boolean> {
    const deletedGroupsCount = await this.#groupsRepository.delete(id);

    return Boolean(deletedGroupsCount);
  }
}

export { Group };
