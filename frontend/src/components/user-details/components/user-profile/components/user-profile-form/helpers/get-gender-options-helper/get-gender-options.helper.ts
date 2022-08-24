import { UserGender } from 'common/enums/enums';
import { SelectorOptions } from 'common/types/types';

const getGenderOptions = (): SelectorOptions[] => {
  return Object.values(UserGender).map<SelectorOptions>((it) => ({
    name: it,
    value: it,
  }));
};

export { getGenderOptions };
