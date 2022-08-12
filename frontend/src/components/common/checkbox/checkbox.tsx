import {
  FC,
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';
import { useFormControl, useState } from 'hooks/hooks';
import React from 'react';

import { ErrorMessage } from '../common';
import styles from './styles.module.scss';

type Props = {
  id: number;
  name: FormControlPath;
  control: FormControl;
  errors: FormControlErrors;
};

const Checkbox: FC<Props> = ({ id, name, control, errors }) => {
  const { field } = useFormControl({ name, control });
  const [value, setValue] = useState<boolean>(false);

  const onChange = (event: React.SyntheticEvent): void => {
    const target = event.target as HTMLInputElement;
    setValue((prev) => {
      field.value ? field.onChange(null) : field.onChange(Number(target.value));

      return !prev;
    });
  };

  return (
    <div className={styles.checkboxWrapper}>
      <input
        {...field}
        type="checkbox"
        className={getValidClasses(field.value && styles.checked)}
        checked={value}
        onChange={onChange}
        name={name}
        value={id}
      />
      <span className={styles.errorMessage}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Checkbox };
