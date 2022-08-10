import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useState } from 'hooks/hooks';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

type Props = {
  title: string;
  children: ReactNode;
  submitTitle: string;
};

const Modal: FC<Props> = ({ title, children, submitTitle }) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const onCloseHandler = (): void => {
    setIsOpen(false);
  };

  return isOpen ? (
    <div className={styles.modalBackgroundContainer}>
      <div className={styles.modalContainer}>
        <span className={styles.modalClose} onClick={onCloseHandler}>
          &times;
        </span>
        <div className={styles.mainContent}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <div className={styles.childrenSection}>{children}</div>
          <div className={styles.submitWrapper}>
            <Button label={submitTitle} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export { Modal };
