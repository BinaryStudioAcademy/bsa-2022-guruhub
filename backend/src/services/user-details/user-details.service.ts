import { HttpCode } from '~/common/enums/enums';
import {
  UserDetailsCreateRequestDto,
  UserDetailsItemDto,
  UserDetailsResponseDto,
} from '~/common/types/types';
import { userDetails as userDetailsRep } from '~/data/repositories/repositories';

type Constructor = {
  userDetailsRepository: typeof userDetailsRep;
};

class UserDetails {
  #userDetailsRepository: typeof userDetailsRep;

  constructor({ userDetailsRepository }: Constructor) {
    this.#userDetailsRepository = userDetailsRepository;
  }

  async update(
    userId: number,
    userDetailsCreateRequestDto: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const userDetailsByUserId = await this.#userDetailsRepository.getByUserId(
      userId,
    );

    if (userDetailsByUserId) {
      const userDetails = await this.#userDetailsRepository.update(
        userDetailsByUserId.id,
        userDetailsCreateRequestDto,
      );

      return {
        status: HttpCode.OK,
        userDetails: userDetails,
      };
    }
    const userDetails = await this.#userDetailsRepository.create(
      userId,
      userDetailsCreateRequestDto,
    );

    return {
      status: HttpCode.CREATED,
      userDetails,
    };
  }

  async getByUserId(userId: number): Promise<UserDetailsItemDto | null> {
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
