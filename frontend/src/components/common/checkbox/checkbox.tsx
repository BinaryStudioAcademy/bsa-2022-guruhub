import {
  FC,
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl, useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  id: number;
  name: FormControlPath;
  errorMessage: string;
  register: FormControlRegister;
  control: FormControl;
};

const Checkbox: FC<Props> = ({ id, name, errorMessage, register, control }) => {
  const { field } = useFormControl({ name, control });
  const [isChecked, setIsChecked] = useState<boolean>(false);

  return (
    <div className={styles.checkboxWrapper}>
      <input
        type="checkbox"
        className={getValidClasses(isChecked && styles.checked)}
        {...register(name, {
          required: {
            value: true,
            message: errorMessage,
          },
        })}
        value={id}
        onClick={(): void => {
          setIsChecked(!field.value.includes(`${id}`));
        }}
      />
    </div>
  );
};

export { Checkbox };
