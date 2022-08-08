import { GroupValidationRule } from '~/common/enums/validation/validation';

const GroupValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_MIN_LENGTH: `Name length must be at least ${GroupValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Name length must be at most ${GroupValidationRule.NAME_MAX_LENGTH} characters long`,
  PERMISSION_IDS_REQUIRE: 'Array with permission ids is required',
  PERMISSION_IDS_MIN_LENGTH:
    'Array with permission ids must contain at least 1 permission',
} as const;

export { GroupValidationMessage };
