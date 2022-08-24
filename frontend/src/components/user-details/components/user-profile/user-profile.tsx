import { FC } from 'common/types/types';

import { AvatarWrapper, UserProfileForm } from './components/components';
import styles from './styles.module.scss';

const UserProfile: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <h1 className={styles.title}>Personal information</h1>
        <h2 className={styles.subtitle}>Profile</h2>
        <AvatarWrapper />
        <UserProfileForm />
      </div>
    </div>
  );
};

export { UserProfile };
