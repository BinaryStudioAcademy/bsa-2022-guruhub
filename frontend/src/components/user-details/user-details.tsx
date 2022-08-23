import { FC } from 'common/types/types';

import { SettingsWrapper, UserProfile } from './components/components';
import styles from './styles.module.scss';

const UserDetails: FC = () => {
  return (
    <div className={styles.grid}>
      <SettingsWrapper />
      <UserProfile />
    </div>
  );
};

export { UserDetails };
