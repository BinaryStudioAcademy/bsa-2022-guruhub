import {
  UserDetailsCreateRequestDto,
  UserDetailsUpdateImage,
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

  public async createAvatar(
    userId: number,
    userDetails: UserDetailsUpdateImage,
  ): Promise<UserDetailsM> {
    const { avatarUrl } = userDetails;

    return this.#UserDetailsModel.query().select('avatarUrl').insert({
      avatarUrl,
    });
  }

  public async updateUserDetails(
    userId: number,
    userDetails: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .select('firstName', 'lastName', 'gender', 'dateOfBirth')
      .patchAndFetchById(userId, userDetails);
  }

  public async updateAvatar(
    userId: number,
    userDetails: UserDetailsUpdateImage,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .select('avatarUrl')
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
