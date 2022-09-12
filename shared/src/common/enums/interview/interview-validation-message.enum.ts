enum InterviewValidationMessage {
  INTERVIEWER_ID_INTEGER = 'Interviewer id must be of type integer',
  STATUS_REQUIRE = 'Status is required',
  STATUS_STRING = 'Status must be of type string',
  STATUS_VALID = 'Status must be one of the following: Pending, New, In Progress, Completed, Rejected, Canceled',
  INTERVIEWEE_ID_INTEGER = 'Interviewee id must be of type integer',
  INTERVIEWEE_ID_REQUIRE = 'Interviewee id is required',
  CATEGORY_ID_INTEGER = 'Category id must be of type integer',
  CATEGORY_ID_REQUIRE = 'Category id id required',
  NOTE_STRING = 'Note must be of type string',
  NOTE_REQUIRE = 'Note is required',
}

export { InterviewValidationMessage };
