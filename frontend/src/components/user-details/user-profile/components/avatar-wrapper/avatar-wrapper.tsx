import defaultUserAvatar from 'assets/img/avatar-default.jpg';
import { FC, UserDetailsUpdateImageRequestDto } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  avatarUrl: string | null;
  onHandleModal: (val: boolean) => void;
  onHandleSaveAvatar: (payload: UserDetailsUpdateImageRequestDto) => void;
};

const AvatarWrapper: FC<Props> = ({
  avatarUrl,
  onHandleModal,
  onHandleSaveAvatar,
}) => {
  const handleSaveAvatar = (): void => {
    if (avatarUrl) {
      onHandleSaveAvatar({
        avatarUrl: avatarUrl,
      });
    }
  };

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.imageWrapper}>
          <Image
            width="136"
            height="136"
            src={avatarUrl || defaultUserAvatar}
            alt="user avatar"
            isCircular
          />
        </div>
        <div>
          <Button
            classes={`${styles.btn} ${styles.btnUpdate}`}
            label="Update File"
            onClick={(): void => onHandleModal(true)}
          />
          <Button
            classes={styles.btn}
            onClick={handleSaveAvatar}
            label="Save"
          />
        </div>
      </div>
    </>
  );
};

export { AvatarWrapper };
