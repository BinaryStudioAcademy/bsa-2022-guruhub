import { UserDetailsValidationRule } from './user-details-validation-rule.enum';

const UserDetailsValidationMessage = {
  FULL_NAME_REQUIRE: 'Full name is required',
  FULL_NAME_MIN_LENGTH: `Full name must be at least ${UserDetailsValidationRule.FULL_NAME_MIN_LENGTH} characters long`,
  FULL_NAME_MAX_LENGTH: `Full name must be at most ${UserDetailsValidationRule.FULL_NAME_MAX_LENGTH} characters long`,
  FULL_NAME_WRONG: 'Full name must consist of alphabetic characters',
  GENDER_REQUIRE: 'Gender is required',
  DATE_OF_BIRTH_REQUIRE: 'Date of birth is required',
  MIN_DATE_OF_BIRTH: `Minimum date of birth must be ${UserDetailsValidationRule.MIN_DATE}`,
  MAX_DATE_OF_BIRTH: `Maximum date of birth must be ${UserDetailsValidationRule.MAX_DATE}`,
} as const;

export { UserDetailsValidationMessage };
