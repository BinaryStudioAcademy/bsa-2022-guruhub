import { DataStatus } from 'common/enums/enums';
import {
  FC,
  UserDetailsUpdateImageRequestDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';

import { UpdateAvatarModal } from '../update-avatar-modal/update-avatar-modal';
import { AvatarWrapper } from './components/avatar-wrapper/avatar-wrapper';
import { UserProfileForm } from './components/user-profile-form/user-profile-form';
import styles from './styles.module.scss';

const UserProfile: FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
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

  const handleUpdateAvatar = (
    payload: UserDetailsUpdateImageRequestDto,
  ): void => {
    handleModal(false);
    setCurrentAvatar(payload.avatarUrl);
  };

  const handleSaveAvatar = (
    payload: UserDetailsUpdateImageRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetailsAvatar(payload));
  };

  const handleModal = (val: boolean): void => {
    setModalIsOpen(val);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.innerWrapper}>
        <div className={styles.title}>Personal information</div>
        <div className={styles.subtitle}>Profile</div>
        {dataStatus !== DataStatus.PENDING && (
          <>
            <AvatarWrapper
              avatarUrl={currentAvatar}
              onHandleModal={handleModal}
              onHandleSaveAvatar={handleSaveAvatar}
            />
            <UserProfileForm
              userDetails={userDetails}
              onHandleUpdateProfile={handleUpdateProfile}
            />
            <UpdateAvatarModal
              modalIsOpen={modalIsOpen}
              avatarUrl={avatarUrl}
              onHandleUpdateAvatar={handleUpdateAvatar}
              onHandleCloseModal={handleModal}
            />
          </>
        )}
      </div>
    </div>
  );
};

export { UserProfile };
