import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
  defaultValue?: string;
  hasVisuallyHiddenLabel?: boolean;
  inputClassName?: string;
};

const Input: FC<Props> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  defaultValue = '',
  hasVisuallyHiddenLabel = false,
  inputClassName = '',
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={getValidClasses(styles.label)}>
      <span
        className={getValidClasses(
          styles.title,
          hasVisuallyHiddenLabel && styles.visuallyHidden,
        )}
      >
        {label}
      </span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={getValidClasses(styles.input, inputClassName)}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
