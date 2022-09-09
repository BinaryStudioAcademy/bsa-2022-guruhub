import { UserDetailsResponseDto } from './user-details';

type UserDetailsWithMoneyBalanceDto = UserDetailsResponseDto & {
  moneyBalance: number;
};

export { type UserDetailsWithMoneyBalanceDto };
