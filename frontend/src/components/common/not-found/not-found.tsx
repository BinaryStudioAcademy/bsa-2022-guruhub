import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';

import { Link } from '../common';
import styles from './styles.module.scss';

const NotFound: FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Not Found</h1>
      <Link to={AppRoute.ROOT}>Return Home</Link>
    </div>
  );
};

export { NotFound };
