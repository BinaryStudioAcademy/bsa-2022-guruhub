import { FC } from 'common/types/types';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  level: 'beginner' | 'intermediate' | 'master';
};

const Bars: FC<Props> = ({ level }) => {
  return (
    <div className={styles.bars}>
      <div
        className={getValidClasses(
          styles.bar,
          styles.barSmall,
          styles.barActive,
        )}
      />
      <div
        className={getValidClasses(
          styles.bar,
          styles.barMedium,
          level === 'intermediate' || level === 'master'
            ? styles.barActive
            : styles.barInactive,
        )}
      />
      <div
        className={getValidClasses(
          styles.bar,
          styles.barBig,
          level === 'master' ? styles.barActive : styles.barInactive,
        )}
      />
    </div>
  );
};

export { Bars };
