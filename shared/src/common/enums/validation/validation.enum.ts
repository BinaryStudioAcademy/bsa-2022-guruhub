const UserValidationRule = {
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 60,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 32,
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 60,
  NAME_PATTERN: /^[ A-Za-z-'`]*$/,
} as const;

export { UserValidationRule };
