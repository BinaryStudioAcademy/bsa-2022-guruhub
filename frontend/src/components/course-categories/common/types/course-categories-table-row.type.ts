import { CategoryGetAllItemResponseDto } from 'common/types/types';

type CourseCategoriesTableRow = {
  id: number;
  title: string;
  category: CategoryGetAllItemResponseDto | null;
};

export { type CourseCategoriesTableRow };
