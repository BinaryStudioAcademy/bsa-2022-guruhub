import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
  UserDetailsWithMoneyBalanceDto,
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
      .withGraphFetched('avatar')
      .returning('*')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public update(
    userId: number,
    userDetails: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto | null> {
    return this.#UserDetailsModel
      .query()
      .findOne({ userId })
      .patch(userDetails)
      .returning('*')
      .first()
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public updateMoneyBalance(
    userId: number,
    newMoneyBalance: number,
  ): Promise<UserDetailsWithMoneyBalanceDto | null> {
    return this.#UserDetailsModel
      .query()
      .patchAndFetchById(userId, {
        moneyBalance: newMoneyBalance,
      })
      .castTo<UserDetailsWithMoneyBalanceDto>()
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsResponseDto | null> {
    return this.#UserDetailsModel
      .query()
      .select()
      .where({ userId })
      .first()
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public updateAvatarFileId(
    userDetailsId: number,
    fileId: number,
  ): Promise<UserDetailsResponseDto> {
    return this.#UserDetailsModel
      .query()
      .patchAndFetchById(userDetailsId, { avatarFileId: fileId })
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }
}

export { UserDetails };
