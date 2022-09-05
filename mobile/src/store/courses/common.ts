enum ActionType {
  ADD_COURSE = 'courses/add-course',
  BECOME_MENTOR = 'courses/become-mentor',
  CHECK_IS_MENTOR = 'course/check-is-a-mentor',
  CREATE_MENTOR = 'courses/create-mentor',
  GET_COURSES = 'courses/get-courses',
  GET_COURSE = 'courses/get-course',
  GET_MENTORS = 'courses/get-mentors',
  GET_MENTEES = 'courses/get-mentees',
  SET_BECOME_MENTOR_INVISIBLE = 'courses/set-become-mentor-invisible',
  UPDATE_VISIBILITY_BECOME_MENTOR = 'courses/update-visibility-become-mentor',
  UPDATE_CATEGORY = 'courses/update-category',
  CHOOSE_A_MENTOR = 'courses/choose-a-mentor',
  SET_IS_MENTOR_CHOOSING_ENABLED = 'courses/set-is-mentor-choosing-enabled',
}

export { ActionType };
