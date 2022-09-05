import { CourseCategoriesTableAccessor } from 'components/course-categories/common/enums/enums';
import {
  CourseCategoriesTableActionsProps,
  CourseCategoriesTableRow,
} from 'components/course-categories/common/types/types';
import {
  ActionsCell,
  CategoryCell,
} from 'components/course-categories/components/components';
import { Column } from 'react-table';

const getCourseCategoriesColumns = (
  onCourseEdit: (course: CourseCategoriesTableRow) => void,
): Column<CourseCategoriesTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: CourseCategoriesTableAccessor.TITLE,
      width: '45%',
    },
    {
      Header: 'Category',
      accessor: CourseCategoriesTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: '40%',
    },
    {
      Header: 'Actions',
      accessor: (
        course: CourseCategoriesTableRow,
      ): CourseCategoriesTableActionsProps => ({
        onEdit: onCourseEdit,
        course,
      }),
      Cell: ActionsCell,
      width: '15%',
    },
  ];
};

export { getCourseCategoriesColumns };
