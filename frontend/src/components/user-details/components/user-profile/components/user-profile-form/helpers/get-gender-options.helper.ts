import { UserGender } from 'common/enums/enums';
import { SelectorOptions } from 'common/types/types';

const genderOptions: SelectorOptions[] = Object.values(UserGender).map(
  (it) => ({
    name: it,
    value: it,
  }),
);

export { genderOptions };
