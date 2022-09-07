enum InterviewsApiPath {
  ROOT = '/',
  $ID = '/:id',
  NOTES = '/notes',
  INTERVIEWEE_USER_$ID_CATEGORIES = '/interviewee/:intervieweeUserId/categories',
  INTERVIEWEE_USER_$ID_ACTIVE_CATEGORIES = '/interviewee/:intervieweeUserId/active/categories',
  INTERVIEWERS_CATEGORIES_$ID = '/interviewers/categories/:categoryId',
  INTERVIEWERS = '/interviewers',
  INTERVIEWEE = '/interviewee',
  CATEGORIES = '/categories',
  $ID_OTHER = '/:id/other',
  OTHER = '/other',
  ACTIVE = '/active',
}

export { InterviewsApiPath };
