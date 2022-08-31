import { UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
};

const GENDER_OPTIONS = [
  {
    label: UserGender.MALE,
    value: UserGender.MALE,
  },
  {
    label: UserGender.FEMALE,
    value: UserGender.FEMALE,
  },
  {
    label: UserGender.OTHER,
    value: UserGender.OTHER,
  },
];

export { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD, GENDER_OPTIONS };
