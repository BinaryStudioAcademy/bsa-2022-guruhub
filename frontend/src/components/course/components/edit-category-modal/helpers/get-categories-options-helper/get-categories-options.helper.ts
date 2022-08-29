import {
  CategoryGetAllItemResponseDto,
  SelectorOption,
} from 'common/types/types';

const getCategoriesOptions = (
  categories: CategoryGetAllItemResponseDto[],
): SelectorOption[] => {
  return categories.map<SelectorOption>((category) => ({
    name: category.name,
    value: `${category.id}`,
  }));
};

export { getCategoriesOptions };
