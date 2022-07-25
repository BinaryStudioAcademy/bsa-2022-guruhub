import { FieldErrors } from 'react-hook-form';

import { FormControlValues } from './form-control-values.type';

type FormControlErrors<T = FormControlValues> = FieldErrors<T>;

export { type FormControlErrors };
