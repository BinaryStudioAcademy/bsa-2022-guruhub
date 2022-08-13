import { UserDetailsValidationRule } from './user-details-validation-rule.enum';

const UserDetailsValidationMessage = {
  FIRST_NAME_REQUIRE: 'First name is required',
  FIRST_NAME_MIN_LENGTH: `First name must be at least ${UserDetailsValidationRule.FIRST_NAME_MIN_LENGTH} characters long`,
  FIRST_NAME_MAX_LENGTH: `First name must be at most ${UserDetailsValidationRule.FIRST_NAME_MAX_LENGTH} characters long`,
  FIRST_NAME_WRONG: 'First name must consist of alphabetic characters',
  LAST_NAME_REQUIRE: 'Last name is required',
  LAST_NAME_MIN_LENGTH: `Last name must be at least ${UserDetailsValidationRule.LAST_NAME_MIN_LENGTH} characters long`,
  LAST_NAME_MAX_LENGTH: `Last name must be at most ${UserDetailsValidationRule.LAST_NAME_MAX_LENGTH} characters long`,
  LAST_NAME_WRONG: 'Last name must consist of alphabetic characters',
  GENDER_REQUIRE: 'Gender is required',
} as const;

export { UserDetailsValidationMessage };
