import { CourseGetResponseDto, FC } from 'common/types/types';

import { Pagination } from '../pagination/pagination';
import { Course } from './components/components';
import styles from './styles.module.scss';

type Props = {
  courses: CourseGetResponseDto[];
  placeholderText?: string;
  totalCount: number;
  pageSize: number;
  currentPage: number;
  onPageChange: (newPage: number) => void;
};

const CoursesList: FC<Props> = ({
  courses,
  placeholderText = 'There is no courses',
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
}) => {
  if (!courses.length) {
    return <p className={styles.placeholder}>{placeholderText}</p>;
  }

  return (
    <>
      <div className={styles.container}>
        {courses.map((course) => (
          <Course key={course.id} course={course} />
        ))}
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
