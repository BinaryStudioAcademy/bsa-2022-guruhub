enum CourseModulesApiPath {
  ROOT = '/',
  COURSES_$ID_MODULES = '/:courseId/modules',
  COURSES_$ID_MODULES_$ID = '/:courseId/modules/:moduleId',
  COURSES_$ID_MENTEES_$ID = '/:courseId/mentees/:menteeId',
}

export { CourseModulesApiPath };
