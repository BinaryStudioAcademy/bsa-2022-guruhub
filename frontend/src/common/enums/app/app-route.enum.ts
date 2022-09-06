enum AppRoute {
  ROOT = '/',
  SIGN_IN = '/sign-in',
  SIGN_UP = '/sign-up',
  MENTORS = '/mentors',
  EDUCATION = '/education',
  INTERVIEW = '/interviews',
  INTERVIEWS_$ID = '/interviews/:id',
  SETTINGS_PROFILE = '/settings/profile',
  UAM = '/uam',
  BILLING = '/billing',
  UAM_CONFIGURE_GROUP = '/uam/configure-group',
  UAM_CONFIGURE_GROUP_$ID = '/uam/configure-group/:id',
  CHATS = '/chats',
  COURSES_$ID = '/courses/:id',
  COURSES = '/courses',
  COURSES_MANAGEMENT = '/courses-management',
  COURSES_$ID_MODULES_$ID = '/courses/:courseId/modules/:moduleId',
  ANY = '*',
}

export { AppRoute };
