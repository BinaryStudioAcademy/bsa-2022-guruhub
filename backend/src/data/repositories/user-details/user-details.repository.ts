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
    userId: number,
    fileId: number,
  ): Promise<UserDetailsM> {
    return this.#UserDetailsModel
      .query()
      .findOne({ userId })
      .patchAndFetch({ avatarFileId: fileId })
      .execute();
  }
}

export { UserDetails };
