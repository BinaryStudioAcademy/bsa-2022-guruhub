enum TasksApiPath {
  TASKS_$ID = '/:taskId',
  MODULES_$ID_MENTEES_$ID = '/modules/:moduleId/mentees/:menteeId',
  TASKS_$ID_NOTES = '/:taskId/notes',
  MODULES = '/modules',
  MENTEES = '/mentees',
  NOTES = '/notes',
  COURSES_$ID_MODULES_$ID_MENTEED_$ID = '/courses/:courseId/modules/:moduleId/mentees/:menteeId',
  COURSES = '/courses',
  COURSES_$ID_MENTEES_$ID = '/courses/:courseId/mentees/:menteeId',
}

export { TasksApiPath };
