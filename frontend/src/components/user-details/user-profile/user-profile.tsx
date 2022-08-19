import { DataStatus } from 'common/enums/enums';
import { FC, UserDetailsUpdateInfoRequestDto } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';

import { AvatarWrapper } from './components/avatar-wrapper/avatar-wrapper';
import { UserProfileForm } from './components/user-profile-form/user-profile-form';
import styles from './styles.module.scss';

const UserProfile: FC = () => {
  const dispatch = useAppDispatch();
  const { userDetails, avatarUrl, dataStatus } = useAppSelector(
    (state) => state.userDetails,
  );
  const [currentAvatar, setCurrentAvatar] = useState<string | null>(null);

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
    setCurrentAvatar(avatarUrl);
  }, [avatarUrl]);

  const handleUpdateProfile = (
    payload: UserDetailsUpdateInfoRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetails(payload));
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Personal information</div>
        <div className={styles.subtitle}>Profile</div>
        {dataStatus !== DataStatus.PENDING && (
          <>
            <AvatarWrapper avatarUrl={currentAvatar} />
            <UserProfileForm
              userDetails={userDetails}
              onHandleUpdateProfile={handleUpdateProfile}
            />
          </>
        )}
      </div>
    </div>
  );
};

export { UserProfile };
