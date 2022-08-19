import { FC, FormEvent, SelectorOptions } from 'common/types/types';
import { useState } from 'hooks/hooks';

import styles from './styles.module.scss';

type Props = {
  name: string;
  options: SelectorOptions[];
  setValue: (name: string, value: string) => void;
  value: string;
  label: string;
};

const Selector: FC<Props> = ({ name, label, options, setValue, value }) => {
  const [selectValue, setSelectValue] = useState<string>(value);

  const handleSelectedOption = (event: FormEvent<HTMLSelectElement>): void => {
    setValue(name, event.currentTarget.value);
    setSelectValue(event.currentTarget.value);
  };

  return (
    <div className={styles.wrapper}>
      <label className={styles.title}>{label}</label>
      <div className={styles.select}>
        <select name={name} value={selectValue} onChange={handleSelectedOption}>
          {options.map((option) => (
            <option key={option.key} value={option.value}>
              {option.name}
            </option>
          ))}
        </select>
        <span className="focus"></span>
      </div>
    </div>
  );
};

export { Selector };
