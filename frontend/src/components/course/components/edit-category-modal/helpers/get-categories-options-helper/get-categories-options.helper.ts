import {
  CategoryGetAllItemResponseDto,
  SelectorOptions,
} from 'common/types/types';

const getCategoriesOptions = (
  categories: CategoryGetAllItemResponseDto[],
): SelectorOptions[] => {
  return categories.map<SelectorOptions>((category) => ({
    name: category.name,
    value: `${category.id}`,
  }));
};

export { getCategoriesOptions };
