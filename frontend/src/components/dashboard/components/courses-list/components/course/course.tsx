import defaultCourseImage from 'assets/img/defaultCourseImage.jpeg';
import { CourseGetResponseDto, FC } from 'common/types/types';
import { Image } from 'components/common/common';

import styles from './styles.module.scss';

type Props = {
  course: CourseGetResponseDto;
};

const Course: FC<Props> = ({ course }) => {
  return (
    <div className={styles.container}>
      <div className={styles.vendor}>
        <Image
          src={`/${course.vendor.key}.svg`}
          width="40"
          height="13"
          alt="vendor logo"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.image}>
          <Image
            alt="course image"
            src={course.imageUrl || defaultCourseImage}
            width="100%"
            height="100%"
          />
        </div>
        <div>
          <h4 className={styles.title}>{course.title}</h4>
        </div>
      </div>
    </div>
  );
};

export { Course };
