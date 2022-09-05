import { CourseGetResponseDto } from 'common/types/types';
import { CourseCategoriesTableAccessor } from 'components/course-categories/common/enums/enums';
import { CourseCategoriesTableRow } from 'components/course-categories/common/types/types';

const getCourseCategoriesRows = (
  courses: CourseGetResponseDto[],
): CourseCategoriesTableRow[] => {
  return courses.map((course) => ({
    [CourseCategoriesTableAccessor.ID]: course.id,
    [CourseCategoriesTableAccessor.TITLE]: course.title,
    [CourseCategoriesTableAccessor.CATEGORY]: course.category,
  }));
};

export { getCourseCategoriesRows };
