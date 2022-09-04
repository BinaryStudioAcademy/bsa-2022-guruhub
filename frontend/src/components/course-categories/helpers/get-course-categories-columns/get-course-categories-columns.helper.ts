import { Column } from 'react-table';

import { CourseCategoriesTableAccessor } from '../../common/enums/enums';
import {
  CourseCategoriesTableActionsProps,
  CourseCategoriesTableRow,
} from '../../common/types/types';
import { ActionsCell, CategoryCell } from '../../components/components';

const getCourseCategoriesColumns = (
  onCourseEdit: (course: CourseCategoriesTableRow) => void,
): Column<CourseCategoriesTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: CourseCategoriesTableAccessor.TITLE,
      width: '19%',
    },
    {
      Header: 'Category',
      accessor: CourseCategoriesTableAccessor.CATEGORY,
      Cell: CategoryCell,
      width: '19%',
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
      width: '5%',
    },
  ];
};

export { getCourseCategoriesColumns };
