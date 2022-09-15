import { CoursesManagementTableAccessor } from 'components/courses-management/common/enums/enums';
import {
  CoursesManagementTableActionsProps,
  CoursesManagementTableRow,
  CoursesManagementTableTitleProps,
} from 'components/courses-management/common/types/types';
import {
  ActionsCell,
  CategoryCell,
  TitleCell,
} from 'components/courses-management/components/components';
import { Column } from 'react-table';

const getCoursesManagementColumns = (
  onCourseEdit: (course: CoursesManagementTableRow) => void,
): Column<CoursesManagementTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: (
        course: CoursesManagementTableRow,
      ): CoursesManagementTableTitleProps => ({
        id: course.id,
        title: course.title,
      }),
      Cell: TitleCell,
      width: 500,
      maxWidth: 700,
      minWidth: 200,
    },
    {
      Header: 'Category',
      accessor: CoursesManagementTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: 250,
      minWidth: 110,
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
      width: 120,
      minWidth: 80,
    },
  ];
};

export { getCoursesManagementColumns };
