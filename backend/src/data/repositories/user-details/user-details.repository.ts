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

  private static DEFAULT_DETAILS_COLUMNS_TO_RETURN: string[] = [
    'id',
    'gender',
    'createdAt',
    'updatedAt',
    'dateOfBirth',
    'userId',
    'fullName',
    'avatarFileId',
    'telegramUsername',
  ];

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
      .returning(UserDetails.DEFAULT_DETAILS_COLUMNS_TO_RETURN)
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
      .returning(UserDetails.DEFAULT_DETAILS_COLUMNS_TO_RETURN)
      .first()
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public async updateMoneyBalance(
    userId: number,
    newMoneyBalance: number,
  ): Promise<UserDetailsWithMoneyBalanceDto> {
    const details = await this.#UserDetailsModel
      .query()
      .select()
      .where('userId', userId)
      .first();

    return (details as UserDetailsM)
      .$query()
      .patchAndFetch({
        moneyBalance: newMoneyBalance,
      })
      .castTo<UserDetailsWithMoneyBalanceDto>()
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsResponseDto | null> {
    return this.#UserDetailsModel
      .query()
      .select(...UserDetails.DEFAULT_DETAILS_COLUMNS_TO_RETURN)
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
      .returning(UserDetails.DEFAULT_DETAILS_COLUMNS_TO_RETURN)
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }
}

export { UserDetails };
