import {
  UserDetailsUpdateImageRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { UserDetails as UserDetailsM } from '~/data/models/models';

type Constructor = {
  UserDetailsModel: typeof UserDetailsM;
};

class UserDetails {
  #UserDetailsModel: typeof UserDetailsM;

  public constructor({ UserDetailsModel }: Constructor) {
    this.#UserDetailsModel = UserDetailsModel;
  }

  public async createUserDetails(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsM> {
    const { lastName, firstName, gender, dateOfBirth } = userDetails;

    return this.#UserDetailsModel
      .query()
      .insert({
        firstName,
        lastName,
        gender,
        dateOfBirth,
        userId,
      })
      .execute();
  }

  public async createAvatar(
    userId: number,
    userDetails: UserDetailsUpdateImageRequestDto,
  ): Promise<UserDetailsM> {
    const { avatarUrl } = userDetails;

    return this.#UserDetailsModel.query().select('avatarUrl').insert({
      avatarUrl,
    });
  }

  public async updateUserDetails(
    userId: number,
    userDetails:
      | UserDetailsUpdateInfoRequestDto
      | UserDetailsUpdateImageRequestDto,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .patchAndFetchById(userId, userDetails);
  }

  public async getByUserId(userId: number): Promise<UserDetailsM | null> {
    const userDetails = await this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first();

    return userDetails ?? null;
  }
}

export { UserDetails };
