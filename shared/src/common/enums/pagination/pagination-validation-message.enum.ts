import { PaginationValidationRule } from './pagination-validation-rule.enum';

const PaginationValidationMessage = {
  MIN_PAGE: `Page number should be not less than ${PaginationValidationRule.MIN_PAGE}`,
  MIN_COUNT: `Count number should be not less than ${PaginationValidationRule.MIN_COUNT}`,
} as const;

export { PaginationValidationMessage };
