enum NotificationMessage {
  INTERVIEW_CREATE_SUCCESS = 'Interview has been successfully created!',
  INTERVIEW_UPDATE = 'Interview has been successfully updated!',
  MENTOR_ADD_SUCCESS = 'You have successfully became a mentor for this course!',
  GROUP_ADD_SUCCESS = 'Group has been successfully created!',
  GROUP_EDIT_SUCCESS = 'Group has been successfully updated!',
  UPDATE_SUCCESS = 'Successful update!',
  EDIT_CATEGORY_SUCCESS = 'Course category has been successfully updated!',
  PROFILE_AVATAR_UPDATE = 'Profile avatar was successfully updated!',
  IMAGE_TO_BIG = 'Image size should be less than 1mb',
  INVALID_PHOTO_FORMAT = 'Supported formats: .PNG, .JPEG, .SVG`',
  COURSES_MENTORING_UPDATE = 'Students count is successfully updated!',
  MENTOR_CHOOSE = 'You have successfully chose a mentor for this course!',
  NOT_ENOUGH_FUNDS_TO_WITHDRAW = 'You need to have at least 1$ to withdraw your funds.',
  SUCCESSFULL_REPLENISH = 'You have successfully replenished your balance.',
  SUCCESSFUL_WITHDRAW_START = 'Withdrawing process has successfully started. You need to wait when your bank transfers your funds on your count.',
}

export { NotificationMessage };
