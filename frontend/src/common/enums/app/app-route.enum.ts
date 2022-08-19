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
  UAM_CONFIGURE_GROUP = '/uam/configure-group',
  UAM_CONFIGURE_GROUP_$ID = '/uam/configure-group/:id',
  ANY = '*',
}

export { AppRoute };
