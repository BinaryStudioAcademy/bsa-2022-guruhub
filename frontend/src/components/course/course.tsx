import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Image, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { courseActions } from 'store/actions';

import styles from './styles.module.scss';

const Course: FC = () => {
  const { course, dataStatus } = useAppSelector((state) => state.course);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(courseActions.getCourse({ id: Number(id) }));
  }, [id]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>There is no course with provided id</p>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>{course?.title}</h1>
        <div className={styles.image}>
          <Image
            alt="course image"
            src={course?.imageUrl ?? defaultCourseImage}
            width="100%"
            height="100%"
          />
        </div>
        <h2 className={styles.about}>About this course</h2>
        <div
          dangerouslySetInnerHTML={{ __html: course?.description as string }}
        />
      </div>

      <div className={styles.additional}></div>
    </div>
  );
};

export { Course };
