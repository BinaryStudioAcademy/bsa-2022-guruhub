import { TableColumn } from '~/common/types/types';
import { CoursesManagementTableAccessor } from '~/components/courses-management/common/enums/enums';
import { CoursesManagementTableData } from '~/components/courses-management/common/types/types';

const getCoursesManagementColumns =
  (): TableColumn<CoursesManagementTableData>[] => {
    return [
      {
        header: 'Title',
        accessor: CoursesManagementTableAccessor.TITLE,
      },
      {
        header: 'Category',
        accessor: CoursesManagementTableAccessor.CATEGORY,
      },
      {
        header: 'Actions',
        accessor: CoursesManagementTableAccessor.ACTION,
      },
    ];
  };

export { getCoursesManagementColumns };
