import { FC } from 'common/types/types';
import { Content } from 'components/common/common';

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
      <div className={styles.description}>
        {description && <Content html={description} />}
      </div>
    </div>
  );
};

export { ModuleCard };
