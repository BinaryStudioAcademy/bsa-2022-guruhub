import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { getValidClasses } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  avatarUrl: string | null | undefined;
};

const AvatarWrapper: FC<Props> = ({ avatarUrl }) => {
  return (
    <div className={styles.flex}>
      <div className={styles.imageWrapper}>
        <Image
          width="136"
          height="136"
          src={avatarUrl ?? defaultUserAvatar}
          alt="user avatar"
          isCircular
        />
      </div>
      <div>
        <Button
          classes={getValidClasses(styles.btn, styles.btnUpdate)}
          label="Update File"
          btnType="upload"
        />
        <Button classes={styles.btn} label="Save" />
      </div>
    </div>
  );
};

export { AvatarWrapper };
