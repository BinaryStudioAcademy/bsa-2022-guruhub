import { FC } from 'common/types/types';
import { Button, Modal } from 'components/common/common';
import { useState } from 'hooks/hooks';

import { AddCourseModal } from './components/components';
import styles from './styles.module.scss';

const DashboardHeader: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleModalToggle = (): void => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Courses</h1>
          <Button label="+ Add new course" onClick={handleModalToggle} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        title="Add new course"
      >
        <AddCourseModal onModalToggle={handleModalToggle} />
      </Modal>
    </>
  );
};

export { DashboardHeader };
