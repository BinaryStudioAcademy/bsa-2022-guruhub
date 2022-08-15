import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import { useState } from 'hooks/hooks';

import { AddCourseModal } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.header}>
        <h1>Courses</h1>
        <Button label="+ Add new course" onClick={handleNewCourseModalToggle} />
        <AddCourseModal
          isModalOpen={isNewCourseModalOpen}
          onModalToggle={handleNewCourseModalToggle}
        />
      </div>
    </div>
  );
};

export { Dashboard };
