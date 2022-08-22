import { FC } from 'common/types/types';

import { AvatarWrapper, UserProfileForm } from './components/components';
import styles from './styles.module.scss';

const UserProfile: FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Personal information</div>
        <div className={styles.subtitle}>Profile</div>
        <>
          <AvatarWrapper />
          <UserProfileForm />
        </>
      </div>
    </div>
  );
};

export { UserProfile };
