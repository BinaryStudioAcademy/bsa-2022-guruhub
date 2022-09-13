enum CourseValidationMessage {
  INVALID_URL = 'URL is not valid. URL must be a Udemy course link (https://www.udemy.com/24823, https://www.udemy.com/java-tutorial)',
  URL_REQUIRE = 'URL is required',
  EMPTY_COURSE_ID = 'Course id can not be empty',
  EMPTY_COURSE_CATEGORY_ID = 'Course category can not be empty',
  CATEGORY_REQUIRE = 'Category id is required',
  CATEGORY_INTEGER = 'Category id must be of type integer',
  MENTOR_ID_REQUIRE = 'Mentor id is required',
  MENTOR_ID_INTEGER = 'Mentor id must be of type integer',
  MENTEE_ID_REQUIRE = 'Mentee id is required',
  MENTEE_ID_INTEGER = 'Mentee id must be of type integer',
}

export { CourseValidationMessage };
