import { FC } from 'common/types/types';
import { useHandleClickOutside, useRef, useState } from 'hooks/hooks';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  isOpenDefault: boolean;
  title: string;
  children: ReactNode;
};

const Modal: FC<Props> = ({ isOpenDefault = true, title, children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenDefault);
  const onCloseHandler = (): void => {
    setIsOpen(false);
  };
  const popupRef = useRef<HTMLDivElement>(null);

  useHandleClickOutside({
    ref: popupRef,
    onClick: onCloseHandler,
  });

  return isOpen ? (
    <div className={styles.modalBackgroundContainer}>
      <div className={styles.modalContainer} ref={popupRef}>
        <span className={styles.modalClose} onClick={onCloseHandler}>
          &times;
        </span>
        <div className={styles.mainContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.childrenSection}>{children}</div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export { Modal };
