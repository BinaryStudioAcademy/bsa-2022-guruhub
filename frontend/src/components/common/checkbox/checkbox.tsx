import { FC } from 'common/types/types';
import { useState } from 'react';
import styles from '../../uam/components/group-creation/group-creation.module.scss';

type Props = {
  styles: {
    wrapperClass: string;
    inputClass: string;
  };
};

const Checkbox: FC<Props> = ({ styles }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (): void => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div className={styles.wrapperClass}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className={isChecked ? styles.inputClass : ''}
      />
    </div>
  );
};

// Needed for rendering inside of a table
// I think this is very bad, need your help how to organize this
const CheckboxComponent = (
  <Checkbox
    styles={{
      wrapperClass: styles.checkboxWrapper,
      inputClass: styles.checked,
    }}
  />
);

export { Checkbox, CheckboxComponent };
