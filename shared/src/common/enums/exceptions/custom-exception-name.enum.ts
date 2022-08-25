enum CustomExceptionName {
  HTTP_ERROR = 'HttpError',
  AUTH_ERROR = 'AuthError',
  INVALID_CREDENTIALS = 'InvalidCredentials',
  INVALID_GROUP = 'InvalidGroup',
  INVALID_COURSE = 'InvalidCourse',
  COURSE_MODULE_ERROR = 'CourseModuleError',
  PERMISSION_ERROR = 'PermissionError',
  STORAGE_ERROR = 'StorageError',
  INTERVIEW_ERROR = 'InterviewError',
  COURSES_TO_MENTORS_ERROR = 'CoursesToMentorsError',
  MENTEES_TO_MENTORS_ERROR = 'MenteesToMentorsError',
}

export { CustomExceptionName };
