import { UserDetailsResponseDto } from '../user-details/user-details';

type UserWithDetailsDto = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: UserDetailsResponseDto;
};

export { UserWithDetailsDto };
