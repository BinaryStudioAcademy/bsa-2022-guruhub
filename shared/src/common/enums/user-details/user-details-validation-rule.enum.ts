const UserDetailsValidationRule = {
  FIRST_NAME_MIN_LENGTH: 2,
  FIRST_NAME_MAX_LENGTH: 15,
  LAST_NAME_MIN_LENGTH: 2,
  LAST_NAME_MAX_LENGTH: 20,
  FIRST_NAME_PATTERN: /^[ A-Za-z-'`]*$/,
  LAST_NAME_PATTERN: /^[ A-Za-z-'`]*$/,
} as const;

export { UserDetailsValidationRule };
