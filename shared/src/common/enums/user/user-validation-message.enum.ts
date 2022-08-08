import { UserValidationRule } from '../validation/user-validation-rule.enum';

const UserValidationMessage = {
  EMAIL_REQUIRE: 'Email is required',
  EMAIL_WRONG: 'Email is wrong',
  EMAIL_MIN_LENGTH: `Email length must be at least ${UserValidationRule.EMAIL_MIN_LENGTH} characters long`,
  EMAIL_MAX_LENGTH: `Email length must be at most ${UserValidationRule.EMAIL_MAX_LENGTH} characters long`,
} as const;

export { UserValidationMessage };
