import { FC } from 'common/types/types';
import { useHandleClickOutside } from 'hooks/hooks';
import { ReactNode } from 'react';

import { IconButton } from '../common';
import styles from './styles.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ isOpen, onClose, children, title }) => {
  const { handleDisableContentContainerClick, handleOutsideClick } =
    useHandleClickOutside({
      onClose,
    });

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className={styles.modalBackgroundContainer}
      onClick={handleOutsideClick}
    >
      <div
        className={styles.modalContainer}
        onClick={handleDisableContentContainerClick}
      >
        <div className={styles.crossContainer}>
          <IconButton iconName="cross" onClick={onClose} label="Close modal" />
        </div>
        <div className={styles.mainContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.childrenSection}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export { Modal };
