import { ExceptionMessage, StringCase } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  GroupsCreateRequestDto,
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

  public async getPaginated({
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

  public async create(
    groupsRequestDto: GroupsCreateRequestDto,
  ): Promise<GroupsItemResponseDto> {
    const { name, permissionIds, userIds } = groupsRequestDto;
    const groupByName = await this.#groupsRepository.getByName(name);

    if (groupByName) {
      throw new GroupsError();
    }
    const permissions = await this.#permissionService.getByIds(permissionIds);

    if (permissions.items.length !== permissionIds.length) {
      const permissionsNotExist = permissionIds.filter((id) => {
        return !permissions.items.find((p) => p.id === id);
      });
      const message = `Permission with id ${permissionsNotExist.join(
        ', ',
      )} doesn't exist.` as ExceptionMessage;
      throw new GroupsError({
        message,
      });
    }

    if (userIds) {
      const users = await this.#userService.getByIds(userIds);

      if (users.length !== userIds.length) {
        const usersNotExist = userIds.filter((id) => {
          return !users.find((user) => user.id === id);
        });
        const message = `User with id ${usersNotExist.join(
          ', ',
        )} doesn't exist.` as ExceptionMessage;
        throw new GroupsError({
          message,
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

    const group = await this.#groupsRepository.update({
      id,
      name,
      key: changeStringCase({
        stringToChange: name,
        caseType: StringCase.SNAKE_CASE,
      }),
    });

    await this.#groupsToPermissionsService.updateGroupsToPermissions({
      groupId: id,
      permissionIds,
    });

    await this.#usersToGroupsService.updateUsersToGroups({
      groupId: id,
      userIds,
    });

    return group;
  }

  public async delete(id: number): Promise<boolean> {
    const deletedGroupsCount = await this.#groupsRepository.delete(id);

    return Boolean(deletedGroupsCount);
  }
}

export { Group };
