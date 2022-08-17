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
  titleClass?: string;
  labelClass?: string;
  inputClass?: string;
};

const Input: FC<Props> = ({
  control,
  errors,
  label,
  name,
  placeholder = '',
  type = 'text',
  titleClass = '',
  labelClass = '',
  inputClass = '',
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <label className={getValidClasses(styles.label, labelClass)}>
      <span className={getValidClasses(styles.title, titleClass)}>{label}</span>
      <input
        {...field}
        type={type}
        placeholder={placeholder}
        className={getValidClasses(inputClass ?? styles.input)}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </label>
  );
};

export { Input };
