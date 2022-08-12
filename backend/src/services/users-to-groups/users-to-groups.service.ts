import { UsersToGroupsResponseDto } from '~/common/types/types';
import { usersToGroups as usersToGroupsRep } from '~/data/repositories/repositories';

type Constructor = {
  usersToGroupsRepository: typeof usersToGroupsRep;
};

class UsersToGroups {
  #usersToGroupsRepository: typeof usersToGroupsRep;

  constructor({ usersToGroupsRepository }: Constructor) {
    this.#usersToGroupsRepository = usersToGroupsRepository;
  }

  async createUsersToGroups(usersToGroups: {
    groupId: number;
    userId: number;
  }): Promise<UsersToGroupsResponseDto> {
    const model = await this.#usersToGroupsRepository.create(usersToGroups);

    return {
      id: model.id,
      groupId: model.groupId,
      userId: model.userId,
    };
  }

  async getUsersByGroupId(
    groupId: number,
  ): Promise<UsersToGroupsResponseDto[]> {
    const users = await this.#usersToGroupsRepository.getByGroupId(groupId);

    return users;
  }

  async updateUsersByGroupId(usersToGroups: {
    groupId: number;
    userIds: number[];
  }): Promise<void> {
    const { groupId, userIds } = usersToGroups;
    const groupUsers = await this.getUsersByGroupId(groupId);
    const dbUsersId = groupUsers.map((user) => user.userId);

    await Promise.all(
      userIds.map((userId: number) => {
        if (!dbUsersId.includes(userId)) {
          return this.createUsersToGroups({
            groupId,
            userId,
          });
        }
      }),
    );

    await Promise.all(
      groupUsers.map((user: UsersToGroupsResponseDto) => {
        if (!userIds.includes(user.userId)) {
          return this.delete(user.id);
        }
      }),
    );

    return;
  }

  async delete(id: number): Promise<boolean> {
    const deleteGroupUsers = await this.#usersToGroupsRepository.delete(id);

    return Boolean(deleteGroupUsers);
  }
}

export { UsersToGroups };
