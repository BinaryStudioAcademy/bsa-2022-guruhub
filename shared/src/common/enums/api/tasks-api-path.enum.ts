enum TasksApiPath {
  TASKS_$ID = '/:taskId',
  MODULES_$ID_MENTEES_$ID = '/modules/:moduleId/mentees/:menteeId',
  TASKS_$ID_NOTES = '/:taskId/notes',
  MODULES = '/modules',
  MENTEES = '/mentees',
  NOTES = '/notes',
}

export { TasksApiPath };
