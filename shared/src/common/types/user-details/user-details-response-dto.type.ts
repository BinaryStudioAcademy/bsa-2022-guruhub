import { UserGender } from '~/common/enums/enums';

type UserDetailsResponseDto = {
  id: number;
  fullName: string;
  gender: typeof UserGender | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
};

export { type UserDetailsResponseDto };
