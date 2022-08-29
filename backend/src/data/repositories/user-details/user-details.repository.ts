import {
  UserDetailsResponseDto,
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

  public create(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const { fullName, gender } = userDetails;

    return this.#UserDetailsModel
      .query()
      .insert({
        fullName,
        gender,
        userId,
      })
      .returning('*')
      .execute();
  }

  public update(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsM | null> {
    return this.#UserDetailsModel
      .query()
      .findOne({ userId })
      .patch(userDetails)
      .returning('*')
      .first()
      .castTo<UserDetailsM>()
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsM | null> {
    return this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first()
      .castTo<UserDetailsM>()
      .execute();
  }
}

export { UserDetails };
