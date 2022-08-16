import { UsersToGroupsResponseDto } from '~/common/types/types';
import { usersToGroups as usersToGroupsRep } from '~/data/repositories/repositories';

type Constructor = {
  usersToGroupsRepository: typeof usersToGroupsRep;
};

class UsersToGroups {
  #usersToGroupsRepository: typeof usersToGroupsRep;

  public constructor({ usersToGroupsRepository }: Constructor) {
    this.#usersToGroupsRepository = usersToGroupsRepository;
  }

  public async createUsersToGroups(usersToGroups: {
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
}

export { UsersToGroups };
