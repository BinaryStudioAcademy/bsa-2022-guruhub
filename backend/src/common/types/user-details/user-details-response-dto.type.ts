import { HttpCode } from '~/common/enums/enums';

import { UserDetailsItemDto } from './user-details';

type UserDetailsResponseDto = {
  status: HttpCode;
  userDetails: UserDetailsItemDto;
};

export { type UserDetailsResponseDto };
