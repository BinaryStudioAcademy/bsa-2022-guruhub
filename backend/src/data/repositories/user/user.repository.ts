import { User as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
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

  async create(user: {
    email: string;
    full_name: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, full_name, passwordSalt, passwordHash } = user;

    return this.#UserModel.query().insert({
      email,
      full_name,
      passwordSalt,
      passwordHash,
    });
  }
}

export { User };
