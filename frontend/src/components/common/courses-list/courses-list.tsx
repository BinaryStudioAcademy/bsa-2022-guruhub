import { CourseGetResponseDto, FC } from 'common/types/types';

import { Course } from './components/components';
import styles from './styles.module.scss';

type Props = {
  courses: CourseGetResponseDto[];
  placeholderText?: string;
};

const CoursesList: FC<Props> = ({
  courses,
  placeholderText = 'There is no courses',
}) => {
  if (!courses.length) {
    return <p className={styles.placeholder}>{placeholderText}</p>;
  }

  return (
    <div className={styles.container}>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

export { CoursesList };
