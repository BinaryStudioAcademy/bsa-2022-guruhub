import { useState } from 'hooks/hooks';

import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { Popup } from './components/components';
import logo from 'assets/img/logo.svg';
import defaultUserAvatar from 'assets/img/avatar-default.svg';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState<boolean>(false);

  const handleOpenMenuPopup = (): void => setIsMenuPopupVisible(true);

  const handleCloseMenuPopup = (): void => setIsMenuPopupVisible(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Image width="150" height="94" src={logo} alt="logo" />
        </div>
        <div className={styles.userWrapper}>
          <button onClick={handleOpenMenuPopup} className={styles.button}>
            <Image
              width="50"
              height="50"
              src={defaultUserAvatar}
              alt="user avatar"
              isCircular
            />
          </button>
          <div className={styles.popup}>
            {isMenuPopupVisible && <Popup onClose={handleCloseMenuPopup} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
