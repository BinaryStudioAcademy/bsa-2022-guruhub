import { UserGetAllRequestQueryDto } from 'guruhub-shared/common/types/types';

import { User as UserM } from '~/data/models/models';

type Constructor = {
  UserModel: typeof UserM;
};

class User {
  #UserModel: typeof UserM;

  constructor({ UserModel }: Constructor) {
    this.#UserModel = UserModel;
  }

  async getAll({ page, count }: UserGetAllRequestQueryDto): Promise<UserM[]> {
    return this.#UserModel
      .query()
      .limit(count)
      .offset((page - 1) * count);
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
