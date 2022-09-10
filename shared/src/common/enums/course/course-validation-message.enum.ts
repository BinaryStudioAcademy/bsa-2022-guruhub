import { CourseValidationRule } from './course-validation-rule.enum';

const CourseValidationMessage = {
  INVALID_URL:
    'URL is not valid. URL must be a Udemy course link (https://www.udemy.com/24823, https://www.udemy.com/java-tutorial)',
  EMPTY_COURSE_ID: 'Course id can not be empty',
  EMPTY_COURSE_CATEGORY_ID: 'Course category can not be empty',
  EMPTY_MAX_STUDENTS_COUNT: 'Maximum students count can not be empty',
  INVALID_STUDENTS_COUNT_NUMBER: `Students count number should be not less than ${CourseValidationRule.STUDENTS_COUNT_MIN_NUMBER}`,
} as const;

export { CourseValidationMessage };
