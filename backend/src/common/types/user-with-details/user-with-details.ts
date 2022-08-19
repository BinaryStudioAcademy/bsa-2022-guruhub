import { UserWithDetails as UserWithDetailsM } from '~/data/models/models';

type UserWithDetails = {
  total: number;
  results: UserWithDetailsM[];
};

export { type UserWithDetails };
