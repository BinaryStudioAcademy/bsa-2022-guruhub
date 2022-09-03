enum CoursesApiPath {
  ROOT = '/',
  MODULES = '/modules',
  CATEGORY = '/category',
  $ID = '/:id',
  $ID_MODULES = '/:id/modules',
  $ID_MENTORS = '/:id/mentors',
  $ID_MENTEES = '/:id/mentees',
  $ID_IS_MENTOR_CHECK = '/:id/is-mentor-check',
  IS_MENTOR_CHECK = '/is-mentor-check',
  $ID_HAS_MENTOR_CHECK = '/:id/has-mentor-check',
  HAS_MENTOR_CHECK = '/has-mentor-check',
  MENTORS = '/mentors',
  MENTEES = '/mentees',
  $ID_CATEGORY = '/:id/category',
}

export { CoursesApiPath };
