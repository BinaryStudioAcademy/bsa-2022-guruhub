import { UserDetailsValidationRule } from './user-details-validation-rule.enum';

const UserDetailsValidationMessage = {
  FULL_NAME_REQUIRE: 'Full name is required',
  FULL_NAME_MIN_LENGTH: `Full name must be at least ${UserDetailsValidationRule.FULL_NAME_MIN_LENGTH} characters long`,
  FULL_NAME_MAX_LENGTH: `Full name must be at most ${UserDetailsValidationRule.FULL_NAME_MAX_LENGTH} characters long`,
  FULL_NAME_WRONG: 'Full name must consist of alphabetic characters',
  GENDER_REQUIRE: 'Gender is required',
} as const;

export { UserDetailsValidationMessage };
