enum ExceptionMessage {
  UNKNOWN_ERROR = 'Unknown error occurred.',
  BAD_CREDENTIALS = 'You have entered an invalid email or password.',
  UNAUTHORIZED_USER = 'Unauthorized user.',
  INVALID_TOKEN = 'Token is invalid.',
  INVALID_GROUP_NAME = 'Group name is invalid.',
  INVALID_GROUP_PERMISSIONS = 'Group permissions are invalid.',
  INVALID_GROUP_USERS = 'Group users are invalid.',
  INVALID_GROUP_ID = 'Group id is invalid.',
  INVALID_COURSE_VENDOR = 'Course vendor is invalid.',
  INVALID_COURSE_CATEGORY = 'Course category is invalid.',
  UDEMY_SERVER_RETURNED_AN_INVALID_RESPONSE = 'Udemy server returned an invalid response',
  COURSE_NOT_FOUND = 'Course not found.',
  COURSE_EXIST = 'Course already exists.',
  INVALID_URL_HOST = 'URL is invalid. Only courses from Udemy are supported.',
  PERMISSION_LACK = 'You do not have permission to access this resource.',
  STORAGE_NOT_FOUND = 'Storage was not found',
  INTERVIEW_EXIST = 'Interview for this category was either passed or is in progress',
  INTERVIEW_DOES_NOT_EXIST = 'Interview with that ID does not exist',
  ALREADY_MENTOR_FOR_COURSE = 'You are already a mentor for this course',
}

export { ExceptionMessage };
