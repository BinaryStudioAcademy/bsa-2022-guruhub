import { Control } from 'react-hook-form';

import { FormControlValues } from './form-control-values.type';

type FormControl<T = FormControlValues> = Control<T>;

export { type FormControl };
