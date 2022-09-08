import { UserGender } from 'common/enums/enums';
import { SelectorOption } from 'common/types/types';

const getGenderOptions = (): SelectorOption[] => {
  return Object.values(UserGender).map<SelectorOption>((it) => ({
    label: it,
    value: it,
  }));
};

export { getGenderOptions };
