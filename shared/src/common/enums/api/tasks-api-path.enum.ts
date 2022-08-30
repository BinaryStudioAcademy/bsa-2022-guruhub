enum TasksApiPath {
  TASKS_$ID_UPLOAD = '/:taskId/upload',
  TASKS_$ID_APPROVE = '/:taskId/approve',
  TASKS_$ID_REJECT = '/:taskId/reject',
  MODULES_$ID_MENTEES_$ID = '/modules/:moduleId/mentees/menteeId',
  TASKS_$ID_NOTES = '/:taskId/notes',
}

export { TasksApiPath };
