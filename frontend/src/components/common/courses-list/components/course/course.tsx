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
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.vendor}>
          <Image
            src={`/${course.vendor.key}.svg`}
            width="40"
            height="13"
            alt="vendor logo"
          />
        </div>
        <div className={styles.content}>
          <Link
            to={generateDynamicPath(AppRoute.COURSES_$ID, {
              courseId: course.id,
            })}
            className={styles.image}
          >
            <Image
              alt="course image"
              src={course.imageUrl ?? defaultCourseImage}
              width="100%"
              height="100%"
            />
          </Link>
          <div className={styles.categoryWrapper}>
            <p className={styles.category}>
              {(course.category as CourseCategoryWithPriceDto).name}
            </p>
          </div>
          <div>
            <h4 className={styles.title}>{course.title}</h4>
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <p className={styles.price}>
          ${(course.category as CourseCategoryWithPriceDto).price.price}/h
        </p>
      </div>
    </div>
  );
};

export { Course };
