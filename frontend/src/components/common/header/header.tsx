import defaultUserAvatar from 'assets/img/avatar-default.svg';
import logo from 'assets/img/logo.svg';
import { FC } from 'common/types/types';
import { Image } from 'components/common/common';
import { useRef, useState } from 'hooks/hooks';

import { Popup } from './components/components';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleToggleMenuPopup = (): void =>
    setIsMenuPopupVisible(!isMenuPopupVisible);

  const handleCloseMenuPopup = (): void => setIsMenuPopupVisible(false);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Image width="150" height="94" src={logo} alt="logo" />
        </div>
        <div className={styles.userWrapper}>
          <button
            onClick={handleToggleMenuPopup}
            className={styles.button}
            ref={buttonRef}
          >
            <Image
              width="50"
              height="50"
              src={defaultUserAvatar}
              alt="user avatar"
              isCircular
            />
          </button>
          <div className={styles.popup}>
            {isMenuPopupVisible && (
              <Popup onClose={handleCloseMenuPopup} initiator={buttonRef} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
