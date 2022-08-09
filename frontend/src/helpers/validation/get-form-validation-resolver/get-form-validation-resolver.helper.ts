import { joiResolver } from '@hookform/resolvers/joi';
import { ValidationSchema } from 'common/types/types';
import { Resolver } from 'react-hook-form';

const getFormValidationResolver = (
  validationSchema: ValidationSchema,
): Resolver => {
  return joiResolver(validationSchema);
};

export { getFormValidationResolver };
