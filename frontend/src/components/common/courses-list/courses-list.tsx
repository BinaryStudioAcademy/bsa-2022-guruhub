import { CourseGetResponseDto, FC } from 'common/types/types';

import { Pagination } from '../pagination/pagination';
import { Course } from './components/components';
import styles from './styles.module.scss';

type Props = {
  courses: CourseGetResponseDto[];
  placeholderText?: string;
  popularCourses?: CourseGetResponseDto[];
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const CoursesList: FC<Props> = ({
  courses,
  placeholderText = 'There are no courses',
  popularCourses = [],
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  if (!courses.length) {
    return (
      <div className={styles.placeholderContainer}>
        <p className={styles.placeholder}>{placeholderText}</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.container}>
        {courses.map((course) => {
          const isPopularCourse = popularCourses.some(
            (popularCourse) => popularCourse.id === course.id,
          );

          return (
            <Course
              key={course.id}
              course={course}
              isPopular={isPopularCourse}
            />
          );
        })}
      </div>
      <Pagination
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={pageSize}
        totalCount={totalCount}
      />
    </>
  );
};

export { CoursesList };
