import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  isOverflow?: boolean;
};

const Spinner: FC<Props> = ({ isOverflow = false }) =>
  isOverflow ? (
    <div className={styles.container}>
      <div className={styles.loader}></div>
    </div>
  ) : (
    <div className={styles.loader}></div>
  );

export { Spinner };
