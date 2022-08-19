const today = new Date();
const MIN_DATE = new Date(
  today.setFullYear(today.getFullYear() - 100),
).toDateString();

const UserDetailsValidationRule = {
  FULL_NAME_MIN_LENGTH: 2,
  FULL_NAME_MAX_LENGTH: 40,
  FULL_NAME_PATTERN: /^[ A-Za-z-'`]*$/,
  MIN_DATE: MIN_DATE,
  MAX_DATE: new Date().toDateString(),
} as const;

export { UserDetailsValidationRule };
