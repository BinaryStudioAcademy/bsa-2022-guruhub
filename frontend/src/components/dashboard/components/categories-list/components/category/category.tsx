import { FC, IconName } from 'common/types/types';
import { Icon } from 'components/common/common';

import { getRandomColor } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  iconName: IconName;
  name: string;
};

const Category: FC<Props> = ({ iconName, name }) => {
  return (
    <div className={styles.category} style={{ borderColor: getRandomColor() }}>
      <Icon name={iconName} className={styles.icon} />
      <p>{name}</p>
    </div>
  );
};

export { Category };
