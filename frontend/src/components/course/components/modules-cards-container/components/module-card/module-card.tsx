import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  title: string;
  description: string | null;
};

const ModuleCard: FC<Props> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>
        <p className={styles.header}>{title}</p>
      </div>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export { ModuleCard };
