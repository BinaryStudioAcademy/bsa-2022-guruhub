import { CourseGetResponseDto } from 'common/types/types';

import { CourseCategoriesTableAccessor } from '../../common/enums/enums';
import { CourseCategoriesTableRow } from '../../common/types/course-categories-table-row.type';

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
