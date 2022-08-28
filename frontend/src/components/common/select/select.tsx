import {
  FC,
  FormControl,
  FormControlErrors,
  SelectorOptions,
} from 'common/types/types';
import { ErrorMessage } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  control: FormControl;
  errors: FormControlErrors;
  name: string;
  options: SelectorOptions<string | number>[];
  setValue?: (name: string, value: string) => void;
  value?: string;
  label?: string;
  className?: string;
};

const Select: FC<Props> = ({
  name,
  control,
  errors,
  label,
  options,
  className,
}) => {
  const { field } = useFormControl({ name, control });

  return (
    <div className={getValidClasses(className, styles.wrapper)}>
      {label && <label className={styles.title}>{label}</label>}
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

export { Select };
