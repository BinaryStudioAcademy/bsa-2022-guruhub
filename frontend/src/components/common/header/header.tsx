import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import logo from 'assets/img/logo.svg';
import defaultUserAvatar from 'assets/img/avatar-default.png';

import styles from './styles.module.scss';

const Header: FC = () => (
  <header>
    <div className={styles['header-wrapper']}>
      <div className={styles['logo-wrapper']}>
        <Image width="150" height="94" src={logo} alt="logo" />
      </div>
      <div className={styles['user-wrapper']}>
        <Image
          width="50"
          height="50"
          src={defaultUserAvatar}
          alt="user avatar"
          isCircular
        />
      </div>
    </div>
  </header>
);

export { Header };
