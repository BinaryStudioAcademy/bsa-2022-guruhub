import { UserGender } from '~/common/enums/enums';

type UserDetailsUpdateInfoRequestDto = {
  fullName: string;
  gender: UserGender | null;
};

export { type UserDetailsUpdateInfoRequestDto };
