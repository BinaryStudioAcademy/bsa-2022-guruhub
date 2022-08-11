import defaultUserAvatar from 'assets/img/avatar-default.svg';
import logo from 'assets/img/logo.svg';
import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Image } from 'components/common/common';
import { useAppSelector, useNavigate, useState } from 'hooks/hooks';

import { Popup } from './components/components';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const handlePopupOper = (): void =>
    setIsMenuPopupVisible(!isMenuPopupVisible);

  const handleLogIn = (): void => navigate(AppRoute.SIGN_IN);
  const handleSignUp = (): void => navigate(AppRoute.SIGN_UP);

  return (
    <header>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Image width="150" height="94" src={logo} alt="logo" />
        </div>
        <div className={styles.userWrapper}>
          {!user ? (
            <div className={styles.buttonsWrapper}>
              <Button onClick={handleLogIn} label="Log In" color="grey" />
              <Button onClick={handleSignUp} label="Sign Up" />
            </div>
          ) : (
            <button onClick={handlePopupOper} className={styles.button}>
              <Image
                width="50"
                height="50"
                src={defaultUserAvatar}
                alt="user avatar"
                isCircular
              />
            </button>
          )}
          <div className={styles.popup}>
            {isMenuPopupVisible && <Popup onClose={handlePopupOper} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
