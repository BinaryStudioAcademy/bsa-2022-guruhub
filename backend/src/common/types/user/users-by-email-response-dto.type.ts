import { UserDetailsResponseDto } from '~/common/types/types';

type UsersByEmailResponseDto = {
  id: number;
  email: string;
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
  userDetails: UserDetailsResponseDto;
};

export { type UsersByEmailResponseDto };
