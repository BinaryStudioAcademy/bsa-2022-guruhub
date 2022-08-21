import {
  FC,
  FormControl,
  FormControlErrors,
  SelectorOptions,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { useFormControl } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  name: string;
  options: SelectorOptions[];
  setValue?: (name: string, value: string) => void;
  value?: string;
  label: string;
};

const Selector: FC<Props> = ({ name, control, errors, label, options }) => {
  const { field } = useFormControl({ name, control });

  return (
    <div className={styles.wrapper}>
      <label className={styles.title}>{label}</label>
      <div className={styles.selectWrapper}>
        <select {...field} className={styles.select} name={name}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <span className="focus"></span>
      </div>
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Selector };
