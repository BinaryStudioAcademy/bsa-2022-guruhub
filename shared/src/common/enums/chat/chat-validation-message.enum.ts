enum ChatValidationMessage {
  MESSAGE_REQUIRE = 'Message is required',
  MESSAGE_STRING = 'Message must be of type string',
  RECEIVER_ID_REQUIRE = 'Receiver id is required',
  RECEIVER_ID_INTEGER = 'Receiver id must be of type integer',
  CHAT_ID_STRING = 'Chat id must be of type string',
  MESSAGE_MIN_LENGTH = 'Full name must be at least 1 character long',
  MESSAGE_MAX_LENGTH = 'Full name must be at most 500 characters long',
}

export { ChatValidationMessage };
