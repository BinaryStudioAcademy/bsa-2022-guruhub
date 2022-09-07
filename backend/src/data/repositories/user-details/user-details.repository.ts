import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from '~/common/types/types';
import { UserDetails as UserDetailsM } from '~/data/models/models';

type Constructor = {
  UserDetailsModel: typeof UserDetailsM;
};

const DEFAULT_DETAILS_COLUMNS_TO_RETURN = [
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
      .returning(DEFAULT_DETAILS_COLUMNS_TO_RETURN.join(', '))
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
      .returning(DEFAULT_DETAILS_COLUMNS_TO_RETURN.join(', '))
      .first()
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsResponseDto | null> {
    return this.#UserDetailsModel
      .query()
      .select(...DEFAULT_DETAILS_COLUMNS_TO_RETURN)
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
      .returning(DEFAULT_DETAILS_COLUMNS_TO_RETURN.join(', '))
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }
}

export { UserDetails };
