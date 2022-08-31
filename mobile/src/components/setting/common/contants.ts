import { UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
};

const GENDER_OPTIONS = Object.values(UserGender).map((gender) => ({
  label: gender,
  value: gender,
}));

export { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD, GENDER_OPTIONS };
