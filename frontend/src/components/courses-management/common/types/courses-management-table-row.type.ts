import { CategoryGetAllItemResponseDto } from 'common/types/types';

type CoursesManagementTableRow = {
  id: number;
  title: string;
  category: CategoryGetAllItemResponseDto | null;
};

export { type CoursesManagementTableRow };
