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
  UAM_CREATE_GROUP = '/uam/groups/create',
  UAM_EDIT_GROUP = '/uam/groups/edit/:id',
  ANY = '*',
}

export { AppRoute };
