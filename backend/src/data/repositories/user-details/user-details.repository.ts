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
    const { fullName, gender, dateOfBirth } = userDetails;

    return this.#UserDetailsModel
      .query()
      .insert({
        fullName,
        gender,
        dateOfBirth,
        userId,
      })
      .execute();
  }

  public updateUserDetails(
    id: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .select()
      .patchAndFetchById(id, userDetails)
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsM | undefined> {
    const userDetails = this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first()
      .execute();

    return userDetails;
  }
}

export { UserDetails };
