import { CourseGetResponseDto } from 'common/types/types';
import { CoursesManagementTableAccessor } from 'components/courses-management/common/enums/enums';
import { CoursesManagementTableRow } from 'components/courses-management/common/types/types';

const getCoursesManagementRows = (
  courses: CourseGetResponseDto[],
): CoursesManagementTableRow[] => {
  return courses.map((course) => ({
    [CoursesManagementTableAccessor.ID]: course.id,
    [CoursesManagementTableAccessor.TITLE]: course.title,
    [CoursesManagementTableAccessor.CATEGORY]: course.category,
  }));
};

export { getCoursesManagementRows };
