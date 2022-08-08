import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';
import { ErrorMessage } from 'components/common/common';
import styles from './input.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  label: string;
  name: FormControlPath;
  placeholder?: string;
  type?: 'text' | 'email' | 'date' | 'password';
};

const Input: FC<Props> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={styles.label}>
      <span className={styles.title}>{label}</span>
      <input
        className={styles.input}
        {...field}
        type={type}
        placeholder={placeholder}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
