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
    const { lastName, firstName, gender, dateOfBirth } = userDetails;

    return this.#UserDetailsModel
      .query()
      .select('firstName', 'lastName', 'gender', 'dateOfBirth')
      .insert({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        userId,
      });
  }

  async update(
    userId: number,
    userDetails: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .select('firstName', 'lastName', 'gender', 'dateOfBirth')
      .patchAndFetchById(userId, userDetails);
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
