enum ActionType {
  GET_COURSE = 'course/get-course',
  GET_CATEGORIES = 'course/get-categories',
  GET_MODULES = 'course/get-modules',
  CREATE_INTERVIEW = 'course/create-interview',
  CREATE_MENTOR = 'course/create-mentor',
  GET_PASSED_INTERVIEW_CATEGORY_IDS = 'course/get-passed-interview-category-ids',
  SET_IS_MENTOR_BECOMING_ENABLED = 'course/set-is-mentor-becoming-enabled',
  GET_MENTORS = 'course/get-mentors',
  GET_MENTOR = 'course/get-mentor',
  GET_MENTOR_MENTEES = 'course/mentor/get-mentees',
  UPDATE_CATEGORY = 'course/update-category',
  DISABLE_MENTOR_BECOMING = 'course/disable-mentor-becoming',
  BECOME_A_MENTOR = 'course/become-a-mentor',
  CHOOSE_A_MENTOR = 'course/choose-a-mentor',
  CHANGE_A_MENTOR = 'course/change-a-mentor',
  SET_IS_MENTOR_CHOOSING_ENABLED = 'course/set-is-mentor-choosing-enabled',
  CHECK_IS_MENTOR = 'course/check-is-a-mentor',
  GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID = 'course/get-modules-by-course-id-and-mentee-id',
}

export { ActionType };
