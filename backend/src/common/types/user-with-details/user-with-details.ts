import { UsersGetResponseDto } from '~/common/types/types';

type UserWithDetails = {
  total: number;
  results: UsersGetResponseDto[];
};

export { type UserWithDetails };
