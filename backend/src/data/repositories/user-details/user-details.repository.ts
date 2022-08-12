import { UserDetails as UserDetailsM } from '~/data/models/models';

type Constructor = {
  UserDetailsModel: typeof UserDetailsM;
};

class UserDetails {
  #UserDetailsModel: typeof UserDetailsM;

  constructor({ UserDetailsModel }: Constructor) {
    this.#UserDetailsModel = UserDetailsModel;
  }

  async getByUserId(userId: number): Promise<UserDetailsM | null> {
    const userDetails = await this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first();

    return userDetails ?? null;
  }
}

export { UserDetails };
