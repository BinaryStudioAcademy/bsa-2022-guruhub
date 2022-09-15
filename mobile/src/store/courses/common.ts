enum ActionType {
  ADD_COURSE = 'courses/add-course',
  BECOME_MENTOR = 'courses/become-mentor',
  CHANGE_A_MENTOR = 'courses/change-a-mentor',
  CHECK_IS_MENTOR = 'courses/check-is-a-mentor',
  CLEAR_MENTOR = 'courses/clear-mentor',
  CREATE_MENTOR = 'courses/create-mentor',
  GET_COURSES = 'courses/get-courses',
  GET_COURSE = 'courses/get-course',
  GET_MENTORS = 'courses/get-mentors',
  GET_MENTEES_MENTOR = 'courses/get-mentees-mentor',
  GET_MENTEES = 'courses/get-mentees',
  SET_BECOME_MENTOR_INVISIBLE = 'courses/set-become-mentor-invisible',
  UPDATE_VISIBILITY_BECOME_MENTOR = 'courses/update-visibility-become-mentor',
  UPDATE_CATEGORY = 'courses/update-category',
  CHOOSE_A_MENTOR = 'courses/choose-a-mentor',
  SET_IS_MENTOR_CHOOSING_ENABLED = 'courses/set-is-mentor-choosing-enabled',
  GET_MODULES_BY_COURSE_ID_AND_MENTEE_ID = 'courses/get-modules-by-course-id-and-mentee-id',
  CLEAR_TASKS = 'courses/clear-tasks',
  ADD_CURRENT_MENTEE_ID = 'courses/add-current-mentee-id',
  CLEAR_CURRENT_MENTEE_ID = 'courses/clear-current-mentee-id',
}

export { ActionType };
