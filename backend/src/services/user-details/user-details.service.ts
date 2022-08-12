import { UserDetailsCreateRequestDto } from 'guruhub-shared';

import { UserDetailsResponseDto } from '~/common/types/types';
import { UserDetails as UserDetailsM } from '~/data/models/models';
import { userDetails as userDetailsRep } from '~/data/repositories/repositories';

type Constructor = {
  userDetailsRepository: typeof userDetailsRep;
};

class UserDetails {
  #userDetailsRepository: typeof userDetailsRep;

  constructor({ userDetailsRepository }: Constructor) {
    this.#userDetailsRepository = userDetailsRepository;
  }

  async create(
    userDetailsCreateRequestDto: UserDetailsCreateRequestDto,
  ): Promise<UserDetailsM> {
    // eslint-disable-next-line no-console
    console.log('user eq body');
    // eslint-disable-next-line no-console
    console.log(userDetailsCreateRequestDto);
    const userDetails = await this.#userDetailsRepository.create(
      userDetailsCreateRequestDto,
    );

    return userDetails;
  }

  async getByUserId(userId: number): Promise<UserDetailsResponseDto | null> {
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
