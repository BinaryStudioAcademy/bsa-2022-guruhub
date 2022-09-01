import { UserGender } from '~/common/enums/enums';

type UserDetailsResponseDto = {
  id: number;
  fullName: string;
  gender: UserGender | null;
  avatarUrl: string | null;
  dateOfBirth: Date | null;
};

export { type UserDetailsResponseDto };
