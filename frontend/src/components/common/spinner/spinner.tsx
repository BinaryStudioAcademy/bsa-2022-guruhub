import { FC } from 'common/types/types';

import styles from './styles.module.scss';

type Props = {
  isOverflow?: boolean;
};

const Spinner: FC<Props> = ({ isOverflow = false }) => {
  if (isOverflow) {
    return (
      <div className={styles.container}>
        <div className={styles.loader}></div>
      </div>
    );
  }

  return <div className={styles.loader}></div>;
};

export { Spinner };
