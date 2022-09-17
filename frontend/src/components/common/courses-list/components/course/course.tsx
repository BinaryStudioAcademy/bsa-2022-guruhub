import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { AppRoute } from 'common/enums/enums';
import {
  CourseCategoryWithPriceDto,
  CourseGetResponseDto,
  FC,
} from 'common/types/types';
import { Image, Link } from 'components/common/common';
import { generateDynamicPath } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  course: CourseGetResponseDto;
};

const Course: FC<Props> = ({ course }) => {
  return (
    <li className={styles.container}>
      <div className={styles.vendor}>
        <Image
          src={`/${course.vendor.key}.svg`}
          width="40"
          height="13"
          alt="vendor logo"
        />
      </div>
      <div className={styles.content}>
        <Image
          alt="course image"
          src={course.imageUrl ?? defaultCourseImage}
          width="100%"
          height="100%"
          className={styles.image}
        />
        <div className={styles.categoryWrapper}>
          <p className={styles.category}>
            {(course.category as CourseCategoryWithPriceDto).name}
          </p>
        </div>
        <Link
          to={generateDynamicPath(AppRoute.COURSES_$ID, {
            courseId: course.id,
          })}
          className={styles.link}
        >
          <h4 className={styles.title}>{course.title}</h4>
        </Link>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>
          ${(course.category as CourseCategoryWithPriceDto).price.price}/h
        </p>
      </div>
    </li>
  );
};

export { Course };
