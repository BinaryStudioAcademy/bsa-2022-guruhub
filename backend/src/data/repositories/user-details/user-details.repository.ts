import { UserDetailsCreateRequestDto } from '~/common/types/types';
import { UserDetails as UserDetailsM } from '~/data/models/models';

type Constructor = {
  UserDetailsModel: typeof UserDetailsM;
};

class UserDetails {
  #UserDetailsModel: typeof UserDetailsM;

  constructor({ UserDetailsModel }: Constructor) {
    this.#UserDetailsModel = UserDetailsModel;
  }

  async create(
    userId: number,
    userDetails: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsM> {
    const { lastName, firstName, gender, dateOfBirth, avatarUrl } = userDetails;

    return this.#UserDetailsModel.query().insert({
      firstName,
      lastName,
      avatarUrl,
      gender,
      dateOfBirth,
      userId,
    });
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
