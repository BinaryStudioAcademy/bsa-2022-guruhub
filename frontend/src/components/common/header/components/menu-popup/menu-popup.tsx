import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useHandleClickOutside, useRef } from 'hooks/hooks';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
};

const Popup: FC<Props> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  useHandleClickOutside(popupRef, onClose);

  return (
    <div className={styles.popup} ref={popupRef}>
      <ul className={styles.ul}>
        <li>
          <div>
            <Button label="Logout" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export { Popup };
