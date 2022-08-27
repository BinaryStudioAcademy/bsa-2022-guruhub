enum InterviewsApiPath {
  ROOT = '/',
  $ID = '/:id',
  INTERVIEWEE_USER_$ID_CATEGORIES = '/interviewee/:intervieweeUserId/categories',
  INTERVIEWERS_CATEGORY_$ID = '/interviewers/category/:categoryId',
  INTERVIEWERS = '/interviewers',
  INTERVIEWEE = '/interviewee',
  CATEGORIES = '/categories',
  CATEGORY = '/category',
}

export { InterviewsApiPath };
