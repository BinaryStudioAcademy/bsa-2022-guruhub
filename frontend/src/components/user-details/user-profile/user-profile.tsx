import { FC } from 'common/types/types';

import { AvatarWrapper } from './components/avatar-wrapper/avatar-wrapper';
import { UserProfileForm } from './components/user-profile-form/user-profile-form';
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
