import { ItemType } from 'react-native-dropdown-picker';

import { CategoryGetAllItemResponseDto } from '~/common/types/types';

const getCategoriesOptions = (
  categories: CategoryGetAllItemResponseDto[],
): ItemType<string | number>[] => {
  return categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));
};

export { getCategoriesOptions };
