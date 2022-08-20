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
  UAM_CREATE_GROUP = '/uam/groups/create',
  UAM_CONFIGURE_GROUP = '/uam/configure-group',
  UAM_CONFIGURE_GROUP_$ID = '/uam/configure-group/:id',
  COURSES_$ID = '/courses/:id',
  COURSES = '/courses',
  ANY = '*',
}

export { AppRoute };
