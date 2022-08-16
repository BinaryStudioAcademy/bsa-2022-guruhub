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

    return this.#usersToGroupsRepository.update({
      groupId,
      userIds,
    });
  }

  async delete(id: number): Promise<boolean> {
    const deleteGroupUsers = await this.#usersToGroupsRepository.delete(id);

    return Boolean(deleteGroupUsers);
  }
}

export { UsersToGroups };
