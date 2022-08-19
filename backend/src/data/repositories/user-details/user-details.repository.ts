import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';
import { UserDetails as UserDetailsM } from '~/data/models/models';

type Constructor = {
  UserDetailsModel: typeof UserDetailsM;
};

class UserDetails {
  #UserDetailsModel: typeof UserDetailsM;

  public constructor({ UserDetailsModel }: Constructor) {
    this.#UserDetailsModel = UserDetailsModel;
  }

  public createUserDetails(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsM> {
    const { fullName, lastName, firstName, gender, dateOfBirth } = userDetails;

    return this.#UserDetailsModel
      .query()
      .select('firstName', 'lastName', 'gender', 'dateOfBirth')
      .insert({
        fullName,
        firstName,
        lastName,
        gender,
        dateOfBirth,
        userId,
      })
      .execute();
  }

  public updateUserDetails(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .select('firstName', 'lastName', 'gender', 'dateOfBirth')
      .patchAndFetchById(userId, userDetails)
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsM | undefined> {
    const userDetails = this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first()
      .execute();

    return userDetails ?? undefined;
  }
}

export { UserDetails };
