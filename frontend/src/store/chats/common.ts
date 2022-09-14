enum ActionType {
  GET_LAST_MESSAGES = 'chats/get-last-messages',
  GET_MESSAGES = 'chats/get-messages',
  CREATE_MESSAGE = 'chats/create-message',
  CHECK_HAS_UNREAD_MESSAGES = 'chats/check-has-unread-messages',
  CLEAN_HAS_UNREAD_MESSAGES = 'chats/clean-has-unread-messages',
  SET_HAS_UNREAD_MESSAGES = 'chats/set-has-unread-messages',
  GET_NEW_MESSAGE = 'chats/get-new-message',
  LISTEN_TO_MESSAGES = 'chats/listen-to-messages',
  REMOVE_LISTENER = 'chats/remove-listener',
  JOIN_ROOM = 'chats/join-room',
  LEAVE_ROOM = 'chats/leave-room',
}

export { ActionType };
