import { CourseUpdateMentoringDto } from 'common/types/types';
import { CoursesMentoringTableAccessor } from 'components/my-courses/common/enums/enums';
import {
  CoursesMentoringTableActionsProps,
  CoursesMentoringTableRow,
} from 'components/my-courses/common/types/types';
import { ActionsCell } from 'components/my-courses/components/components';
import { Column } from 'react-table';

const getCoursesMentoringColumns = (
  onCourseEdit: (course: CourseUpdateMentoringDto) => void,
): Column<CoursesMentoringTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: CoursesMentoringTableAccessor.TITLE,
      width: '65%',
    },
    {
      Header: 'Actions',
      accessor: ({
        id,
        maxStudentsCount,
      }: CoursesMentoringTableRow): CoursesMentoringTableActionsProps => ({
        onEdit: onCourseEdit,
        course: {
          courseId: id,
          maxStudentsCount,
        },
      }),
      Cell: ActionsCell,
      width: '35%',
    },
  ];
};

export { getCoursesMentoringColumns };
