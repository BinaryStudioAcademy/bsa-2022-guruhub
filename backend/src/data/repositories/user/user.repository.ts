import {
  Group as GroupM,
  Permission as PermissionM,
  User as UserM,
} from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
  GroupModel: typeof GroupM;
};

class User {
  #UserModel: typeof UserM;
  #GroupModel: typeof GroupM;

  constructor({ UserModel, GroupModel }: Constructor) {
    this.#UserModel = UserModel;
    this.#GroupModel = GroupModel;
  }

  async getAll(): Promise<UserM[]> {
    return this.#UserModel.query();
  }

  async getByEmail(email: string): Promise<UserM | null> {
    const user = await this.#UserModel
      .query()
      .select()
      .where({ email })
      .first();

    return user ?? null;
  }

  async getById(id: string): Promise<UserM | null> {
    const user = await this.#UserModel.query().select().where({ id }).first();

    return user ?? null;
  }

  async getUserPermissons(id: number): Promise<PermissionM[] | null> {
    const groups = await this.#UserModel
      .query()
      .select('groups.id')
      .joinRelated('groups')
      .where('users.id', id);

    const groupsIds = groups.map((group) => group.id);

    if (groupsIds.length === 0) {
      return null;
    }

    const permissions = await this.#GroupModel
      .query()
      .select('permissions.name', 'permissions.id', 'permissions.key')
      .joinRelated('permissions')
      .whereIn('groups.id', groupsIds);

    //Beter solution but don't know how to implement with objection

    // const knex = await this.#UserModel.knex();

    // const permissions = await knex.raw(`
    // SELECT per.name, per.id, per.key
    // FROM users
    // INNER JOIN users_to_groups AS utg ON utg.user_id = user_id
    // INNER JOIN groups AS grp ON grp.id = utg.group_id
    // INNER JOIN groups_to_permissions AS gtp ON gtp.group_id = grp.id
    // INNER JOIN permissions AS per ON per.id = gtp.permission_id
    // WHERE users.id = ${id}`);

    // if (permissions.length === 0) {
    //   return null;
    // }

    return permissions;
  }

  async create(user: {
    email: string;
    fullName: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, fullName, passwordSalt, passwordHash } = user;

    return this.#UserModel.query().insert({
      email,
      fullName,
      passwordSalt,
      passwordHash,
    });
  }

  async delete(userId: number): Promise<number> {
    return this.#UserModel.query().delete().where({ id: userId });
  }
}

export { User };
