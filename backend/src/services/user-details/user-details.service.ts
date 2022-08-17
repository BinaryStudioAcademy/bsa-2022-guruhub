import { HttpCode } from '~/common/enums/enums';
import {
  UserDetailsCreateRequestDto,
  UserDetailsItemDto,
  UserDetailsResponseDto,
  UserDetailsUpdateImage,
} from '~/common/types/types';
import { userDetails as userDetailsRep } from '~/data/repositories/repositories';

type Constructor = {
  userDetailsRepository: typeof userDetailsRep;
};

class UserDetails {
  #userDetailsRepository: typeof userDetailsRep;

  public constructor({ userDetailsRepository }: Constructor) {
    this.#userDetailsRepository = userDetailsRepository;
  }

  public async updateUserDetails(
    userId: number,
    userDetailsCreateRequestDto: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const userDetailsByUserId = await this.#userDetailsRepository.getByUserId(
      userId,
    );

    if (userDetailsByUserId) {
      const userDetails = await this.#userDetailsRepository.updateUserDetails(
        userDetailsByUserId.id,
        userDetailsCreateRequestDto,
      );

      return {
        status: HttpCode.OK,
        userDetails: userDetails,
      };
    }
    const userDetails = await this.#userDetailsRepository.createUserDetails(
      userId,
      userDetailsCreateRequestDto,
    );

    return {
      status: HttpCode.CREATED,
      userDetails,
    };
  }

  public async updateAvatar(
    userId: number,
    userDetailsUpdateAvatar: UserDetailsUpdateImage,
  ): Promise<UserDetailsResponseDto> {
    const userDetailsByUserId = await this.#userDetailsRepository.getByUserId(
      userId,
    );

    if (userDetailsByUserId) {
      const userDetails = await this.#userDetailsRepository.updateAvatar(
        userDetailsByUserId.id,
        userDetailsUpdateAvatar,
      );

      return {
        status: HttpCode.OK,
        userDetails: userDetails,
      };
    }

    const userDetails = await this.#userDetailsRepository.createAvatar(
      userId,
      userDetailsUpdateAvatar,
    );

    return {
      status: HttpCode.CREATED,
      userDetails,
    };
  }

  public async getByUserId(userId: number): Promise<UserDetailsItemDto | null> {
    const userDetails = await this.#userDetailsRepository.getByUserId(userId);

    if (!userDetails) {
      return null;
    }

    return {
      id: userDetails.id,
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      avatarUrl: userDetails.avatarUrl,
      gender: userDetails.gender,
      dateOfBirth: userDetails.dateOfBirth,
    };
  }
}

export { UserDetails };
