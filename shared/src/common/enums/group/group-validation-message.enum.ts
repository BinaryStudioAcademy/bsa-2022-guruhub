import { GroupValidationRule } from './group-validation-rule.enum';

const GroupValidationMessage = {
  NAME_REQUIRE: 'Name is required',
  NAME_STRING: 'Name must be of type string',
  NAME_MIN_LENGTH: `Name length must be at least ${GroupValidationRule.NAME_MIN_LENGTH} characters long`,
  NAME_MAX_LENGTH: `Name length must be at most ${GroupValidationRule.NAME_MAX_LENGTH} characters long`,
  PERMISSION_IDS_REQUIRE: 'Array with permissions ids is required',
  PREMISSION_IDS_INTEGER: 'Permissions ids must be an array of integers',
  PERMISSION_IDS_MIN_LENGTH: `Array with permission ids must contain at least ${GroupValidationRule.PERMISSION_IDS_MIN_LENGTH} permission`,
  USER_IDS_REQUIRE: 'Array with users ids is required',
  USER_IDS_INTEGER: 'Users ids must be an array integers',
} as const;

export { GroupValidationMessage };
