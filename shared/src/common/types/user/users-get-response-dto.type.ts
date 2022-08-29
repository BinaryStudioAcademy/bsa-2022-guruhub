import { UserDetailsResponseDto } from '~/common/types/types';

type UsersGetResponseDto = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: UserDetailsResponseDto;
};

export { type UsersGetResponseDto };
