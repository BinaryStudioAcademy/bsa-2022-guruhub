import { ReactNode } from 'react';

import { FC } from 'common/types/types';
import { useHandleClickOutside, useRef } from 'hooks/hooks';

import { Icon } from '../common';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, children, title }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useHandleClickOutside({
    ref: popupRef,
    onClick: onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalBackgroundContainer}>
      <div className={styles.modalContainer} ref={popupRef}>
        <button className={styles.modalClose} onClick={onClose}>
          <Icon name="cross" />
        </button>
        <div className={styles.mainContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.childrenSection}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
