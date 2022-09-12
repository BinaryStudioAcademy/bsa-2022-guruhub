import { UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';

const SELECTION_LIMIT = 1;

const DEFAULT_UPDATE_USER_DETAILS_PAYLOAD: UserDetailsUpdateInfoRequestDto = {
  fullName: '',
  gender: UserGender.MALE,
  dateOfBirth: null,
  telegramUsername: '',
};

const GENDER_OPTIONS = Object.values(UserGender).map((gender) => ({
  label: gender,
  value: gender,
}));

export { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD, GENDER_OPTIONS, SELECTION_LIMIT };
