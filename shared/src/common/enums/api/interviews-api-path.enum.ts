enum InterviewsApiPath {
  ROOT = '/',
  $ID = '/:id',
  NOTES = '/notes',
  INTERVIEWEE_USER_$ID_CATEGORIES = '/interviewee/:intervieweeUserId/categories',
  INTERVIEWERS_CATEGORY_$ID = '/interviewers/category/:categoryId',
  INTERVIEWERS = '/interviewers',
  INTERVIEWEE = '/interviewee',
  CATEGORIES = '/categories',
  CATEGORY = '/category',
  $ID_OTHER = '/:id/other',
  OTHER = '/other',
}

export { InterviewsApiPath };
