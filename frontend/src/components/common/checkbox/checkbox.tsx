import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';

import { ErrorMessage } from '../common';
import styles from './styles.module.scss';

type Props = {
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
};

const Checkbox: FC<Props> = ({ name, control, errors }) => {
  const { field } = useFormControl({ name, control });

  return (
    <div className={styles.checkboxWrapper}>
      <input
        {...field}
        className={styles.input}
        type="checkbox"
        checked={Boolean(field.value)}
      />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Checkbox };
