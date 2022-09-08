import { CoursesManagementTableAccessor } from 'components/courses-management/common/enums/enums';
import {
  CoursesManagementTableActionsProps,
  CoursesManagementTableRow,
} from 'components/courses-management/common/types/types';
import {
  ActionsCell,
  CategoryCell,
} from 'components/courses-management/components/components';
import { Column } from 'react-table';

const getCoursesManagementColumns = (
  onCourseEdit: (course: CoursesManagementTableRow) => void,
): Column<CoursesManagementTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: CoursesManagementTableAccessor.TITLE,
      width: 500,
    },
    {
      Header: 'Category',
      accessor: CoursesManagementTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: 300,
    },
    {
      Header: 'Actions',
      accessor: (
        course: CoursesManagementTableRow,
      ): CoursesManagementTableActionsProps => ({
        onEdit: onCourseEdit,
        course,
      }),
      Cell: ActionsCell,
      width: 80,
    },
  ];
};

export { getCoursesManagementColumns };
