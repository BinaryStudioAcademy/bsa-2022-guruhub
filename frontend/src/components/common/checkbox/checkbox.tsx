import { FC, FormControlErrors, FormControlPath } from 'common/types/types';

import { ErrorMessage } from '../common';
import styles from './styles.module.scss';

type Props = {
  name: FormControlPath;
  errors: FormControlErrors;
};

const Checkbox: FC<Props> = ({ name, errors }) => {
  return (
    <div className={styles.checkboxWrapper}>
      <input className={styles.input} type="checkbox" />
      <span className={styles.error}>
        <ErrorMessage errors={errors} name={name} />
      </span>
    </div>
  );
};

export { Checkbox };
