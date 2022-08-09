import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useAppDispatch, useHandleClickOutside, useRef } from 'hooks/hooks';
import { authActions } from 'store/actions';

import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
  initiator: React.RefObject<HTMLButtonElement>;
};

const Popup: FC<Props> = ({ onClose, initiator }) => {
  const dispatch = useAppDispatch();
  const popupRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside({
    ref: popupRef,
    onClick: onClose,
    ignoredElement: initiator,
  });

  const handleLogout = (): void => {
    dispatch(authActions.logout());
  };

  return (
    <div className={styles.popup} ref={popupRef}>
      <ul className={styles.ul}>
        <li>
          <div>
            <Button label="Logout" onClick={handleLogout} />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { Popup };
