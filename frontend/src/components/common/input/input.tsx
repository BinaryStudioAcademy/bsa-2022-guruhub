import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { ErrorMessage, PasswordInput } from 'components/common/common';
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
  hasVisuallyHiddenLabel?: boolean;
  inputClassName?: string;
  rows?: number;
};

const Input: FC<Props> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  hasVisuallyHiddenLabel = false,
  inputClassName = '',
  rows,
}) => {
  const { field } = useFormControl({ name, control });
  const isPassword = type === 'password';

  const inputArea = rows ? (
    <textarea
      {...field}
      name={name}
      placeholder={placeholder}
      className={getValidClasses(styles.input, inputClassName)}
      rows={rows}
    />
  ) : (
    <input
      {...field}
      type={type}
      placeholder={placeholder}
      className={getValidClasses(styles.input, inputClassName)}
    />
  );

  return (
    <label
      className={getValidClasses(
        styles.label,
        isPassword && styles.passwordField,
      )}
    >
      <span
        className={getValidClasses(
          styles.title,
          hasVisuallyHiddenLabel && styles.visuallyHidden,
        )}
      >
        {label}
      </span>
      {isPassword ? (
        <PasswordInput
          control={control}
          name={name}
          inputClassName={styles.input}
          placeholder="Enter your password"
        />
      ) : (
        inputArea
      )}
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
