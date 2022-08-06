const EMAIL_MIN_LENGTH = 5;
const EMAIL_MAX_LENGTH = 60;
const EMAIL_PATTERN =
  /^[a-zA-Z0-9]+(?:\.[a-zA-Z0-9]+)*@[a-z0-9]+(?:-[a-z0-9]+)*(\.[a-z]{2,3}){1,2}$/;

export { EMAIL_MIN_LENGTH, EMAIL_MAX_LENGTH, EMAIL_PATTERN };
