import {
  FC,
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';
import { useFormControl } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  id: number;
  name: FormControlPath;
  register: FormControlRegister;
  control: FormControl;
};

const Checkbox: FC<Props> = ({ id, name, register, control }) => {
  const { field } = useFormControl({ name, control });

  return (
    <div className={styles.checkboxWrapper}>
      <input
        className={styles.checkbox}
        {...register(name, {
          required: true,
        })}
        type="checkbox"
        value={id}
        checked={field.value.includes(`${id}`)}
      />
    </div>
  );
};

export { Checkbox };
