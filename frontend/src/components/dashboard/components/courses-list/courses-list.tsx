import { CourseGetResponseDto, FC } from 'common/types/types';

import { Course } from './components/components';
import styles from './styles.module.scss';

type Props = {
  courses: CourseGetResponseDto[];
};

const CoursesList: FC<Props> = ({ courses }) => {
  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <Course key={course.id} title={course.title} vendor={course.vendor} />
      ))}
    </div>
  );
};

export { CoursesList };
