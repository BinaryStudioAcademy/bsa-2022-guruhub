import { CourseUpdateMentoringDto } from 'common/types/types';
import {
  CoursesMentoringTableActionsProps,
  CoursesMentoringTableRow,
  CoursesMentoringTableTitleProps,
} from 'components/my-courses/common/types/types';
import {
  ActionsCell,
  TitleCell,
} from 'components/my-courses/components/components';
import { Column } from 'react-table';

const getCoursesMentoringColumns = (
  onCourseEdit: (course: CourseUpdateMentoringDto) => void,
): Column<CoursesMentoringTableRow>[] => {
  return [
    {
      Header: 'Title',
      accessor: (
        course: CoursesMentoringTableRow,
      ): CoursesMentoringTableTitleProps => ({
        id: course.id,
        title: course.title,
      }),
      Cell: TitleCell,
      width: '85%',
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
      width: '15%',
    },
  ];
};

export { getCoursesMentoringColumns };
