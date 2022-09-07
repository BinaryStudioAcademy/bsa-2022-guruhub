import { FC } from 'common/types/types';

import { UserProfile } from './components/components';
import styles from './styles.module.scss';

const UserDetails: FC = () => {
  return (
    <div className={styles.container}>
      <UserProfile />
    </div>
  );
};

export { UserDetails };
