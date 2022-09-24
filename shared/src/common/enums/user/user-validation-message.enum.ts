import { UserValidationRule } from './user-validation-rule.enum';

const UserValidationMessage = {
  NAME_REQUIRE: 'Full name is required',
  NAME_MIN_LENGTH: `Full name must be at least ${UserValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Full name must be at most ${UserValidationRule.NAME_MAX_LENGTH} characters long`,
  NAME_WRONG: 'Full name must consist of alphabetic characters',
  NAME_STRING: 'Full name must be of type string',
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is invalid',
  EMAIL_MIN_LENGTH: `Email must be at least ${UserValidationRule.EMAIL_MIN_LENGTH} characters long`,
  EMAIL_MAX_LENGTH: `Email must be at most ${UserValidationRule.EMAIL_MAX_LENGTH} characters long`,
  EMAIL_STRING: 'Email must be of type string',
  PASSWORD_REQUIRE: 'Password is required',
  PASSWORD_MIN_LENGTH: `Password must be at least ${UserValidationRule.PASSWORD_MIN_LENGTH} characters long`,
  PASSWORD_MAX_LENGTH: `Password must be at most ${UserValidationRule.PASSWORD_MAX_LENGTH} characters long`,
  PASSWORD_STRING: 'Password must be of type string',
} as const;

export { UserValidationMessage };
