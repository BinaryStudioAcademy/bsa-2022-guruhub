import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useAppDispatch, useHandleClickOutside, useRef } from 'hooks/hooks';
import { authActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
};

const Popup: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();

  const popupRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside({
    ref: popupRef,
    onClick: onClose,
  });

  const handleLogout = (): void => {
    dispatch(authActions.logout()).unwrap().then(onClose);
  };

  return (
    <div className={styles.popup}>
      <div className={styles.wrapper} ref={popupRef}>
        <ul className={styles.ul}>
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
    </div>
  );
};

export { Popup };
