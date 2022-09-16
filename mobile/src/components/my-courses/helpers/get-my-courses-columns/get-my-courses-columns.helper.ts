import { TableColumn } from '~/common/types/types';
import { MyCoursesTableAccessor } from '~/components/my-courses/common/enums/enums';
import { MyCoursesTableData } from '~/components/my-courses/common/types/types';

const getMyCourseColumns = (): TableColumn<MyCoursesTableData>[] => {
  return [
    {
      header: 'Title',
      accessor: MyCoursesTableAccessor.TITLE,
    },
    {
      header: 'Students count',
      accessor: MyCoursesTableAccessor.STUDENTS_COUNT,
    },
  ];
};

export { getMyCourseColumns };
