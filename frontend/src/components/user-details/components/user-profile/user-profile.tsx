import { DataStatus } from 'common/enums/enums';
import { FC, UserDetailsUpdateInfoRequestDto } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';

import { AvatarWrapper, UserProfileForm } from './components/components';
import styles from './styles.module.scss';

const UserProfile: FC = () => {
  const dispatch = useAppDispatch();

  const { userDetails, dataStatus } = useAppSelector(
    (state) => state.userDetails,
  );

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
  }, []);

  const handleUpdateProfile = (
    payload: UserDetailsUpdateInfoRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetails(payload));
  };

  const handleGetUserDetails = (): void => {
    dispatch(userDetailsActions.getUserDetails());
  };

  if (dataStatus === DataStatus.PENDING) {
    return (
      <div className={styles.spinnerWrapper}>
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Personal information</h1>
      <div className={styles.profileContainer}>
        <h2 className={styles.subtitle}>Profile</h2>
        <AvatarWrapper />
        <UserProfileForm
          userDetails={userDetails}
          onGetUserDetails={handleGetUserDetails}
          onUpdateProfile={handleUpdateProfile}
        />
      </div>
    </div>
  );
};

export { UserProfile };
