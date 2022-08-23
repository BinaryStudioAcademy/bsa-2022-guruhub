const UserDetailsValidationRule = {
  FULL_NAME_MIN_LENGTH: 2,
  FULL_NAME_MAX_LENGTH: 40,
  FULL_NAME_PATTERN: /^[ A-Za-z-'`]*$/,
} as const;

export { UserDetailsValidationRule };
