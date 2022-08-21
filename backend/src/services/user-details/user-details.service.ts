import {
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
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
    userDetailsUpdateInfoRequestDto: UserDetailsUpdateInfoRequestDto,
  ): Promise<UserDetailsResponseDto> {
    const userDetailsByUserId = await this.#userDetailsRepository.getByUserId(
      userId,
    );

    if (userDetailsByUserId) {
      const userDetails = await this.#userDetailsRepository.updateUserDetails(
        userDetailsByUserId.id,
        userDetailsUpdateInfoRequestDto,
      );

      return userDetails;
    }

    const userDetails = await this.#userDetailsRepository.createUserDetails(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails;
  }

  public async getByUserId(
    userId: number,
  ): Promise<UserDetailsResponseDto | null> {
    const userDetails = await this.#userDetailsRepository.getByUserId(userId);

    if (!userDetails) {
      return null;
    }

    return userDetails;
  }
}

export { UserDetails };
