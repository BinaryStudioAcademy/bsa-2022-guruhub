import defaultUserAvatar from 'assets/img/avatar-default.svg';
import logo from 'assets/img/logo.svg';
import { AppRoute } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Button, Image, Link } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useLocation,
  useState,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { Popup, SearchBar } from './components/components';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  const isRoot = location.pathname === AppRoute.ROOT;
  const hasUser = Boolean(user);

  const handlePopupOpen = (): void => {
    setIsMenuPopupVisible(!isMenuPopupVisible);
  };

  const handleSearch = (search: string): void => {
    dispatch(dashboardActions.getCourses({ title: search, categoryKey: '' }));
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <div className={styles.logoWrapper}>
          <Link to={AppRoute.ROOT}>
            <Image width="150" height="94" src={logo} alt="logo" />
          </Link>
        </div>
        {isRoot && <SearchBar onSearch={handleSearch} />}
        <div className={styles.userWrapper}>
          {hasUser ? (
            <button onClick={handlePopupOpen} className={styles.button}>
              <div className={styles.imageWrapper}>
                <Image
                  width="50"
                  height="50"
                  src={
                    (user as UserWithPermissions).userDetails.avatar?.url ??
                    defaultUserAvatar
                  }
                  alt="user avatar"
                  isCircular
                  classes={styles.img}
                />
              </div>
            </button>
          ) : (
            <div className={styles.buttonsWrapper}>
              <Button label="Sign In" btnColor="gray" to={AppRoute.SIGN_IN} />
              <Button label="Sign Up" btnColor="blue" to={AppRoute.SIGN_UP} />
            </div>
          )}
          <div className={styles.popup}>
            {isMenuPopupVisible && <Popup onClose={handlePopupOpen} />}
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
