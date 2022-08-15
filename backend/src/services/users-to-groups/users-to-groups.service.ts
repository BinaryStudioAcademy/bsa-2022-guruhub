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

    const usersToCreate = userIds.filter((id: number) => {
      return !dbUsersId.includes(id);
    });
    const usersToDelete = groupUsers.filter(
      (user: UsersToGroupsResponseDto) => {
        return !userIds.includes(user.userId);
      },
    );

    await Promise.all(
      usersToCreate.map((userId: number) => {
        return this.createUsersToGroups({
          groupId,
          userId,
        });
      }),
    );

    await Promise.all(
      usersToDelete.map((user: UsersToGroupsResponseDto) => {
        return this.delete(user.id);
      }),
    );
  }

  async delete(id: number): Promise<boolean> {
    const deleteGroupUsers = await this.#usersToGroupsRepository.delete(id);

    return Boolean(deleteGroupUsers);
  }
}

export { UsersToGroups };
