import { UserDetailsValidationRule } from './user-details-validation-rule.enum';

const UserDetailsValidationMessage = {
  FULL_NAME_REQUIRE: 'Full name is required',
  FULL_NAME_MIN_LENGTH: `Full name must be at least ${UserDetailsValidationRule.FULL_NAME_MIN_LENGTH} characters long`,
  FULL_NAME_MAX_LENGTH: `Full name must be at most ${UserDetailsValidationRule.FULL_NAME_MAX_LENGTH} characters long`,
  FULL_NAME_WRONG: 'Full name must consist of alphabetic characters',
  GENDER_REQUIRE: 'Gender is required',
  TELEGRAM_USERNAME_MIN_LENGTH: `Telegram username must be at least ${UserDetailsValidationRule.TELEGRAM_USERNAME_MIN_LENGTH} characters long`,
  TELEGRAM_USERNAME_MAX_LENGTH: `Telegram username must be at most ${UserDetailsValidationRule.TELEGRAM_USERNAME_MAX_LENGTH} characters long`,
  TELEGRAM_USERNAME_WRONG:
    'Telegram username could consist of alphabetic characters, digits and underscores',
} as const;

export { UserDetailsValidationMessage };
