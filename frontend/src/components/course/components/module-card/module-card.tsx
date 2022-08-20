import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  title: string;
  description: string | null;
};

const ModuleCard: FC<Props> = ({ title, description }) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.header}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export { ModuleCard };
