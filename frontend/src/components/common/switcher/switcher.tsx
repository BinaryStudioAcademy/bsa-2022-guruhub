import { useState } from 'hooks/hooks';
import { FC } from 'react';

import styles from './styles.module.scss';

enum GENDER {
  MALE = 'male',
  FEMALE = 'female',
}

type Props = {
  name: string;
  setGenderValue: (name: string, value: string) => void;
  selected: string;
};

const Switcher: FC<Props> = ({ name, setGenderValue, selected }) => {
  const [activeOption, setActiveOption] = useState<string>(selected);

  const handleSwitchClick = (option: GENDER): void => {
    setGenderValue(name, option);
    setActiveOption(option);
  };

  const leftClasses = `${activeOption === 'male' && styles.selected} ${
    styles.toggleItem
  } ${styles.toggleLeft}`;
  const rightClasses = `${activeOption === 'female' && styles.selected} ${
    styles.toggleItem
  } ${styles.toggleRight}`;

  return (
    <div>
      <div className={styles.switchContainer}>
        <div
          className={leftClasses}
          onClick={(): void => handleSwitchClick(GENDER.MALE)}
        >
          <div className={styles.text}>{GENDER.MALE}</div>
        </div>
        <div
          className={rightClasses}
          onClick={(): void => handleSwitchClick(GENDER.FEMALE)}
        >
          <div className={styles.text}>{GENDER.FEMALE}</div>
        </div>
      </div>
    </div>
  );
};

export { Switcher };
