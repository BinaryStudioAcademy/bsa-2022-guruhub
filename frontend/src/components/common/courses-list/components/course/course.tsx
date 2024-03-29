import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { AppRoute, StringCase } from 'common/enums/enums';
import {
  CourseCategoryWithPriceDto,
  CourseGetResponseDto,
  FC,
} from 'common/types/types';
import { Image, Link } from 'components/common/common';
import { changeStringCase, generateDynamicPath } from 'helpers/helpers';

import styles from './styles.module.scss';

type Props = {
  course: CourseGetResponseDto;
  isPopular?: boolean;
};

const Course: FC<Props> = ({ course, isPopular = false }) => {
  const keyNameKebabCase = changeStringCase({
    stringToChange: course.category?.key as string,
    caseType: StringCase.KEBAB_CASE,
  });

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
        <Image
          alt="course image"
          src={course.imageUrl ?? defaultCourseImage}
          width="100%"
          height="100%"
          className={styles.image}
        />
        <div className={styles.categoryWrapper}>
          <Image
            width="25px"
            height="25px"
            src={`/category-icons/${keyNameKebabCase}.svg`}
            alt={`${course.category?.key} img`}
            isCircular
          />
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
        {isPopular && (
          <p className={styles.bestChoiceWrapper}>
            <span className={styles.bestChoice}>Best Choice</span>
          </p>
        )}
        <p className={styles.price}>
          ${(course.category as CourseCategoryWithPriceDto).price.price}/h
        </p>
      </div>
    </div>
  );
};

export { Course };
