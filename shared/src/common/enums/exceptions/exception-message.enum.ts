enum ExceptionMessage {
  UNKNOWN_ERROR = 'Unknown error occurred.',
  BAD_CREDENTIALS = 'You have entered an invalid username or password.',
  UNAUTHORIZED_USER = 'Unauthorized user.',
  INVALID_TOKEN = 'Token is invalid.',
  INVALID_GROUP_NAME = 'Group name is invalid.',
  INVALID_GROUP_PERMISSIONS = 'Group permissions are invalid.',
  INVALID_GROUP_USERS = 'Group users are invalid.',
  PERMISSION_LACK = 'You don`t have permission to access this resource.',
}

export { ExceptionMessage };
