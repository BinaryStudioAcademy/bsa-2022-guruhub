import { UserGender } from 'common/enums/enums';
import { SelectorOptions } from 'common/types/types';

export const SelectData: SelectorOptions[] = Object.values(UserGender).map(
  (it) => ({
    name: it,
    value: it,
  }),
);
