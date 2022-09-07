import { FC } from 'common/types/types';

import { CoursesManagementTable } from './components/components';
import styles from './styles.module.scss';

const CoursesManagement: FC = () => {
  return (
    <div className={styles.coursesManagement}>
      <h1 className={styles.pageTitle}>Courses Management</h1>
      <CoursesManagementTable />
    </div>
  );
};

export { CoursesManagement };
