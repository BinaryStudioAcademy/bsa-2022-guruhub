import {
  CategoryGetAllItemResponseDto,
  SelectorOption,
} from 'common/types/types';

const getCategoriesOptions = (
  categories: CategoryGetAllItemResponseDto[],
): SelectorOption[] => {
  return categories.map<SelectorOption>((category) => ({
    label: category.name,
    value: `${category.id}`,
  }));
};

export { getCategoriesOptions };
