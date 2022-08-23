import { UserGender } from 'common/enums/enums';
import { SelectorOptions } from 'common/types/types';

export const SelectData: SelectorOptions[] = [
  {
    name: 'Not selected',
    value: '',
  },
  {
    name: UserGender.MALE,
    value: UserGender.MALE,
  },
  {
    name: UserGender.FEMALE,
    value: UserGender.FEMALE,
  },
  {
    name: UserGender.OTHER,
    value: UserGender.OTHER,
  },
];
