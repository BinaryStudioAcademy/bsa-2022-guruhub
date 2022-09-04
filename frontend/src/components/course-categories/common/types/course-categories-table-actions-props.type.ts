import { CourseCategoriesTableRow } from './course-categories-table-row.type';

type CourseCategoriesTableActionsProps = {
  course: CourseCategoriesTableRow;
  onEdit: (course: CourseCategoriesTableRow) => void;
};

export { type CourseCategoriesTableActionsProps };
