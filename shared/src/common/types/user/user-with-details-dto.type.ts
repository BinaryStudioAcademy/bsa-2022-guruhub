import { UserDetailsItemResponseDto } from '../types';

type UserWithDetailsDto = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: UserDetailsItemResponseDto;
};

export { type UserWithDetailsDto };
