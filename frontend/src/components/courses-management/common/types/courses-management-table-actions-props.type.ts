import { CoursesManagementTableRow } from './courses-management-table-row.type';

type CoursesManagementTableActionsProps = {
  course: CoursesManagementTableRow;
  onEdit: (course: CoursesManagementTableRow) => void;
};

export { type CoursesManagementTableActionsProps };
