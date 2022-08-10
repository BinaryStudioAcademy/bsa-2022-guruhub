import { UsersToGroups as UsersToGroupsM } from '~/data/models/models';

type Constructor = {
  UsersToGroupsModel: typeof UsersToGroupsM;
};

class UsersToGroups {
  #UsersToGroupsModel: typeof UsersToGroupsM;

  constructor({ UsersToGroupsModel }: Constructor) {
    this.#UsersToGroupsModel = UsersToGroupsModel;
  }

  async create(usersToGroups: {
    groupId: number;
    userId: number;
  }): Promise<UsersToGroupsM> {
    const { groupId, userId } = usersToGroups;

    return this.#UsersToGroupsModel.query().insert({
      groupId,
      userId,
    });
  }

  async getByUserId(userId: number): Promise<UsersToGroupsM[] | null> {
    const groups = await this.#UsersToGroupsModel
      .query()
      .select()
      .where({ userId });

    return groups ?? null;
  }
}

export { UsersToGroups };
