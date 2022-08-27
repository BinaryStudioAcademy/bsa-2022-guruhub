import { UserDetailsItemResponseDto } from '../types';

type UsersWithDetails = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: UserDetailsItemResponseDto;
};

export { type UsersWithDetails };
