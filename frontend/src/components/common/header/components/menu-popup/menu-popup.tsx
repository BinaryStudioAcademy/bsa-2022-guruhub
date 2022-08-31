import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useAppDispatch, useHandleClickOutside } from 'hooks/hooks';
import { authActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
};

const Popup: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const { handleDisableContentContainerClick, handleOutsideClick } =
    useHandleClickOutside({
      onClose,
    });

  const handleLogout = (): void => {
    dispatch(authActions.logout()).unwrap().then(onClose);
  };

  return (
    <div className={styles.popup} onClick={handleOutsideClick}>
      <ul className={styles.ul} onClick={handleDisableContentContainerClick}>
        <li className={styles.li}>
          <div>
            <Button
              label="Profile"
              btnColor="gray"
              to={AppRoute.SETTINGS_PROFILE}
            />
          </div>
        </li>
        <li className={styles.li}>
          <div>
            <Button
              label="Sign Out"
              onClick={handleLogout}
              className={styles.signOut}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { Popup };
