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

  async getByEmail(email: string): Promise<UserM | undefined> {
    return this.#UserModel.query().select().where({ email }).first();
  }

  async create(user: {
    email: string;
    passwordSalt: string;
    passwordHash: string;
  }): Promise<UserM> {
    const { email, passwordSalt, passwordHash } = user;

    return this.#UserModel.query().insert({
      email,
      passwordSalt,
      passwordHash,
    });
  }
}

export { User };
