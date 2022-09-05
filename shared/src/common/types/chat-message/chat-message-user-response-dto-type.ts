import { UserDetailsResponseDto } from '../types';

type ChatMessageUserResponseDto = {
  id: number;
  email: string;
  userDetails: UserDetailsResponseDto;
};

export { ChatMessageUserResponseDto };
