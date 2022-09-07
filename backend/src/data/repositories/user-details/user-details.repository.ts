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
      .withGraphFetched('avatar')
      .returning(
        'id, gender, createdAt, updatedAt, dateOfBirth, userId, fullName, avatarFileId, telegramUsername',
      )
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
      .returning(
        'id, gender, createdAt, updatedAt, dateOfBirth, userId, fullName, avatarFileId, telegramUsername',
      )
      .first()
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }

  public getByUserId(userId: number): Promise<UserDetailsResponseDto | null> {
    return this.#UserDetailsModel
      .query()
      .select(
        'id',
        'gender',
        'createdAt',
        'updatedAt',
        'dateOfBirth',
        'userId',
        'fullName',
        'avatarFileId',
        'telegramUsername',
      )
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
      .returning(
        'id, gender, createdAt, updatedAt, dateOfBirth, userId, fullName, avatarFileId, telegramUsername',
      )
      .withGraphFetched('avatar')
      .castTo<UserDetailsResponseDto>()
      .execute();
  }
}

export { UserDetails };
