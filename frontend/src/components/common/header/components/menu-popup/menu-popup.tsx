import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

type Props = {
  onClose: () => void;
};

const Popup: FC<Props> = ({ onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close popup when user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent): void => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

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
