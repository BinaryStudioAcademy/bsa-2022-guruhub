import { FC } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';

import { Course } from './components/components';
import styles from './styles.module.scss';

const Courses: FC = () => {
  const { courses } = useAppSelector((state) => state.dashboard);

  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <Course
          key={course.id}
          title={course.title}
          vendor={course.vendorKey}
        />
      ))}
    </div>
  );
};

export { Courses };
