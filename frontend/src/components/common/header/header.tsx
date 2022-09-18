import defaultUserAvatar from 'assets/img/avatar-default.svg';
import logo from 'assets/img/logo.svg';
import { AppRoute, SearchValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Icon, Image, Link } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useCourseSearch,
  useEffect,
  useLocation,
  useState,
} from 'hooks/hooks';
import { chatsActions } from 'store/actions';

import { Popup, SearchBar } from './components/components';
import styles from './styles.module.scss';

const Header: FC = () => {
  const [isMenuPopupVisible, setIsMenuPopupVisible] = useState<boolean>(false);
  const { user, hasUnreadMessages, avatarUrl } = useAppSelector((state) => ({
    user: state.auth.user,
    hasUnreadMessages: state.chats.hasUnreadMessages,
    avatarUrl: state.userDetails.avatarUrl,
  }));

  const location = useLocation();
  const dispatch = useAppDispatch();

  const isRoot = location.pathname === AppRoute.ROOT;
  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasUser) {
      dispatch(chatsActions.checkHasUnreadMessages());
    }

    return () => {
      dispatch(chatsActions.setHasUnreadMessages(false));
    };
  }, [user]);

  const handlePopupOpen = (): void => {
    setIsMenuPopupVisible(!isMenuPopupVisible);
  };

  const { handleSearchPerform } = useCourseSearch();

  const handleSearch = (search: string): void => {
    handleSearchPerform(SearchValue.TITLE, search);
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

        <div className={styles.rightWrapper}>
          {hasUser && (
            <div className={styles.chatLogoWrapper}>
              <Link to={AppRoute.CHATS}>
                <div className={styles.chatImage}>
                  <Icon
                    name={hasUnreadMessages ? 'chatUnread' : 'chat'}
                    className={styles.chatIcon}
                  ></Icon>
                </div>
              </Link>
            </div>
          )}
          <div className={styles.userWrapper}>
            {hasUser ? (
              <div className={styles.popupWrapper}>
                <button onClick={handlePopupOpen} className={styles.button}>
                  <div className={styles.imageWrapper}>
                    <Image
                      width="50"
                      height="50"
                      src={avatarUrl ?? defaultUserAvatar}
                      alt="user avatar"
                      isCircular
                      className={styles.img}
                    />
                  </div>
                </button>
                <button onClick={handlePopupOpen} className={styles.button}>
                  <div className={styles.caretImage}>
                    <Icon
                      name={isMenuPopupVisible ? 'caretUp' : 'caretDown'}
                      className={styles.caretIcon}
                    ></Icon>
                  </div>
                </button>
              </div>
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
      </div>
    </header>
  );
};

export { Header };
