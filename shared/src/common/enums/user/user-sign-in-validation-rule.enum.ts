const UserSignInValidationRule = {
  EMAIL_MIN_LENGTH: 5,
  EMAIL_MAX_LENGTH: 60,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_MAX_LENGTH: 32,
} as const;

export { UserSignInValidationRule };
