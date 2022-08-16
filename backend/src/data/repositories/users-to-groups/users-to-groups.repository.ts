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

  getByGroupId(groupId: number): Promise<UsersToGroupsM[]> {
    return this.#UsersToGroupsModel
      .query()
      .where({ groupId })
      .select()
      .execute();
  }

  update(usersToGroups: { groupId: number; userIds: number[] }): void {
    const { groupId, userIds } = usersToGroups;
    this.#UsersToGroupsModel
      .query()
      .where({ groupId })
      .whereNotIn('user_id', userIds)
      .delete()
      .execute();

    userIds.map((userId: number) => {
      return this.#UsersToGroupsModel
        .query()
        .insert({
          groupId,
          userId,
        })
        .onConflict(['user_id', 'group_id'])
        .ignore()
        .execute();
    });
  }

  delete(id: number): Promise<number> {
    return this.#UsersToGroupsModel.query().delete().where({ id }).execute();
  }
}

export { UsersToGroups };
