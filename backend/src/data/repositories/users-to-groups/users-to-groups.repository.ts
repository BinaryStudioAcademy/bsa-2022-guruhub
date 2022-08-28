import { UsersToGroups as UsersToGroupsM } from '~/data/models/models';

type Constructor = {
  UsersToGroupsModel: typeof UsersToGroupsM;
};

class UsersToGroups {
  #UsersToGroupsModel: typeof UsersToGroupsM;

  public constructor({ UsersToGroupsModel }: Constructor) {
    this.#UsersToGroupsModel = UsersToGroupsModel;
  }

  public async create(usersToGroups: {
    groupId: number;
    userId: number;
  }): Promise<UsersToGroupsM> {
    const { groupId, userId } = usersToGroups;

    return this.#UsersToGroupsModel.query().insert({
      groupId,
      userId,
    });
  }

  public async getByUserId(userId: number): Promise<UsersToGroupsM[] | null> {
    const groups = await this.#UsersToGroupsModel
      .query()
      .select()
      .where({ userId });

    return groups ?? null;
  }

  public async getUsersByGroupId(groupId: number): Promise<UsersToGroupsM[]> {
    const users = await this.#UsersToGroupsModel
      .query()
      .select()
      .where({ groupId });

    return users;
  }

  public async update(usersToGroups: {
    groupId: number;
    userIds: number[];
  }): Promise<void> {
    const { groupId, userIds } = usersToGroups;
    await this.#UsersToGroupsModel
      .query()
      .where({ groupId })
      .whereNotIn('userId', userIds)
      .delete()
      .execute();

    await Promise.all(
      userIds.map((userId: number) => {
        return this.#UsersToGroupsModel
          .query()
          .insert({
            groupId,
            userId,
          })
          .onConflict(['userId', 'groupId'])
          .ignore();
      }),
    );
  }
}

export { UsersToGroups };
