enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  MENTORS = '/mentors',
  EDUCATION = '/education',
  INTERVIEW = '/interviews',
  BILLING = '/billing',
  SETTINGS = '/settings',
  UAM = '/uam',
  PROFILE = '/profile',
  APPEARANCE = '/appearance',
  SECURITY = '/security',
  MESSAGES = '/messages',
  UAM_CONFIGURE_GROUP = '/uam/configure-group',
  UAM_CONFIGURE_GROUP_$ID = '/uam/configure-group/:id',
  COURSES_$ID = '/courses/:id',
  COURSES = '/courses',
  COURSES_$ID_MODULES_$ID = '/courses/:courseId/modules/:moduleId',
  ANY = '*',
}

export { AppRoute };
