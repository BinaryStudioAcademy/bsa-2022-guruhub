import { getValidClasses } from 'helpers/helpers';
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

  return (
    <div>
      <div className={styles.switchContainer}>
        <div
          className={getValidClasses(
            activeOption === GENDER.MALE && styles.selected,
            styles.toggleItem,
            styles.toggleLeft,
          )}
          onClick={handleSwitchClick.bind(this, GENDER.MALE)}
        >
          <div className={styles.text}>{GENDER.MALE}</div>
        </div>
        <div
          className={getValidClasses(
            activeOption === GENDER.FEMALE && styles.selected,
            styles.toggleItem,
            styles.toggleRight,
          )}
          onClick={handleSwitchClick.bind(this, GENDER.FEMALE)}
        >
          <div className={styles.text}>{GENDER.FEMALE}</div>
        </div>
      </div>
    </div>
  );
};

export { Switcher };
