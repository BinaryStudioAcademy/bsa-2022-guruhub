enum CourseValidationMessage {
  INVALID_URL = 'URL is not valid. URL must be a Udemy course link (https://www.udemy.com/24823, https://www.udemy.com/java-tutorial)',
  EMPTY_COURSE_ID = 'Course id can not be empty',
  EMPTY_COURSE_CATEGORY_ID = 'Course category can not be empty',
}

export { CourseValidationMessage };
