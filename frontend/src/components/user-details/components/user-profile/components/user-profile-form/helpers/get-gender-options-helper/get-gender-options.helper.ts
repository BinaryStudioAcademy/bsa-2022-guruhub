import { UserGender } from 'common/enums/enums';
import { SelectorOptions } from 'common/types/types';

const getGenderOptions = (): SelectorOptions[] => {
  return Object.values(UserGender).map(
    (it) =>
      <SelectorOptions>{
        name: it,
        value: it,
      },
  );
};

export { getGenderOptions };
