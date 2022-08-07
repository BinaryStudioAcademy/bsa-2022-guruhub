const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_MIN_LENGTH: 'Email length must be at least {#limit} characters long',
  EMAIL_MAX_LENGTH: 'Email length must be at most {#limit} characters long',
} as const;

export { UserValidationMessage };
