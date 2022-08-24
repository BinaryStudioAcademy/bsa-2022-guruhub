import defaultUserAvatar from 'assets/img/avatar-default.svg';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';

import styles from './styles.module.scss';

const AvatarWrapper: FC = () => {
  return (
    <div className={styles.flex}>
      <div className={styles.imageWrapper}>
        <Image
          width="136"
          height="136"
          src={defaultUserAvatar}
          alt="user avatar"
          isCircular
        />
      </div>
      <div>
        <Button
          type="button"
          btnColor="blue"
          label="Update File"
          btnType="upload"
          className={styles.marginBottom}
        />
        <Button btnColor="blue" label="Save" className={styles.btn} />
      </div>
    </div>
  );
};

export { AvatarWrapper };
