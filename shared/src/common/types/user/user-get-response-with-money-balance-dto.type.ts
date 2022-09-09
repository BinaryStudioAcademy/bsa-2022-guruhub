import { UserDetailsWithMoneyBalanceDto } from '../types';
import { UsersGetResponseDto } from './users-get-response-dto.type';

type UserGetResponseWithMoneyBalanceDto = UsersGetResponseDto & {
  userDetails: UserDetailsWithMoneyBalanceDto;
};

export { type UserGetResponseWithMoneyBalanceDto };
