import { UserGender } from '~/common/enums/enums';

type UserDetailsResponseDto = {
  id: number;
  fullName: string;
  gender: UserGender | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
};

export { type UserDetailsResponseDto };
