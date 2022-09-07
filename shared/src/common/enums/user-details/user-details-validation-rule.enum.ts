const UserDetailsValidationRule = {
  FULL_NAME_MIN_LENGTH: 2,
  FULL_NAME_MAX_LENGTH: 40,
  FULL_NAME_PATTERN: /^[ A-Za-z-'`]*$/,
  TELEGRAM_USERNAME_MIN_LENGTH: 5,
  TELEGRAM_USERNAME_MAX_LENGTH: 32,
  TELEGRAM_USERNAME_PATTERN: /^[A-Za-z0-9_]*$/,
} as const;

export { UserDetailsValidationRule };
