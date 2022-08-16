import defaultUserAvatar from 'assets/img/avatar-default.jpg';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  avatarUrl: string | undefined;
};
const AvatarWrapper: FC<Props> = ({ avatarUrl }) => {
  return (
    <>
      <div className={styles.flex}>
        <div className={styles.imageWrapper}>
          <Image
            width={'136'}
            height={'136'}
            src={avatarUrl || defaultUserAvatar}
            alt="user avatar"
            isCircular
          />
        </div>
        <div>
          <Button
            classes={`${styles.btn} ${styles.btnUpdate}`}
            type="submit"
            label="Update File"
          />
          <Button classes={styles.btn} type="submit" label="Save" />
        </div>
      </div>
    </>
  );
};

export { AvatarWrapper };
