import { CourseGetMentoringDto } from 'common/types/types';
import { CoursesMentoringTableAccessor } from 'components/my-courses/common/enums/enums';
import { CoursesMentoringTableRow } from 'components/my-courses/common/types/types';

const getCoursesMentoringRows = (
  courses: CourseGetMentoringDto[],
): CoursesMentoringTableRow[] => {
  return courses.map((course) => ({
    [CoursesMentoringTableAccessor.ID]: course.id,
    [CoursesMentoringTableAccessor.TITLE]: course.title,
    [CoursesMentoringTableAccessor.STUDENTS_COUNT]: course.studentsCount,
  }));
};

export { getCoursesMentoringRows };
