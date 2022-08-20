import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  orderNumber: number;
  title: string;
  description: string | null;
};

const ModuleCard: FC<Props> = ({ orderNumber, title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.headerContainer}>
        <h3 className={styles.orderNumber}>{orderNumber}. </h3>
        <h3 className={styles.header}>{title}</h3>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export { ModuleCard };
