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
    const userDetails = await this.#userDetailsRepository.updateUserDetails(
      userId,
      userDetailsUpdateInfoRequestDto,
    );

    return userDetails;
  }

  public async getByUserId(
    userId: number,
  ): Promise<UserDetailsResponseDto | null> {
    const userDetails = await this.#userDetailsRepository.getByUserId(userId);

    return userDetails ?? null;
  }
}

export { UserDetails };
