import { FC } from 'common/types/types';

import { CourseCategoriesTable } from './components/components';
import styles from './styles.module.scss';

const CourseCategories: FC = () => {
  return (
    <div className={styles.courseCategories}>
      <h1 className={styles.pageTitle}>Course with categories</h1>
      <CourseCategoriesTable />
    </div>
  );
};

export { CourseCategories };
