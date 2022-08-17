import { FC, IconName } from 'common/types/types';

import { Icon } from '../common';
import styles from './styles.module.scss';

type Props = {
  iconName: IconName;
  onClick: () => void;
};

const IconButton: FC<Props> = ({ iconName, onClick }) => {
  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      <Icon name={iconName} className={styles.icon} />
    </button>
  );
};

export { IconButton };
