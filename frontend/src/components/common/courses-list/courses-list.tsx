import { CourseGetResponseDto, FC } from 'common/types/types';

import { Course } from './components/components';
import styles from './styles.module.scss';

type Props = {
  courses: CourseGetResponseDto[];
  placeholderText?: string;
  popularCourses?: CourseGetResponseDto[];
};

const CoursesList: FC<Props> = ({
  courses,
  placeholderText = 'There are no courses',
  popularCourses = [],
}) => {
  if (!courses.length) {
    return (
      <div className={styles.placeholderContainer}>
        <p className={styles.placeholder}>{placeholderText}</p>
      </div>
    );
  }

  return (
    <ul className={styles.container}>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
          isPopular={popularCourses.some(
            (popularCourse) => popularCourse.id === course.id,
          )}
        />
      ))}
    </ul>
  );
};

export { CoursesList };
