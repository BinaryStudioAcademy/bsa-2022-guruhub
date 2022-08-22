import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useAppDispatch, useHandleClickOutside, useRef } from 'hooks/hooks';
import { authActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  onClose: (evt: React.MouseEvent | void) => void;
};

const Popup: FC<Props> = ({ onClose }) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside({
    ref: popupRef,
    onClick: onClose,
  });

  const handleLogout = (): void => {
    dispatch(authActions.logout());
    dispatch(authActions.logout()).unwrap().then(onClose);
  };

  return (
    <div className={styles.popup} ref={popupRef}>
      <ul className={styles.ul}>
        <li>
          <div>
            <Button label="Sign Out" onClick={handleLogout} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { Popup };
