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

type Markup = {
  __html: string;
};

const Course: FC = () => {
  const { course, dataStatus } = useAppSelector((state) => state.course);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const createMarkup = (str: string): Markup => ({ __html: str });

  useEffect(() => {
    dispatch(courseActions.getCourse({ id: Number(id) }));
  }, [id]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h1>{course?.title}</h1>
        <div className={styles.image}>
          <Image
            alt="course image"
            src={course?.imageUrl || defaultCourseImage}
            width="100%"
            height="100%"
          />
        </div>
        <h2 className={styles.about}>About this course</h2>
        <div
          dangerouslySetInnerHTML={createMarkup(course?.description as string)}
        />
      </div>

      <div className={styles.additional}></div>
    </div>
  );
};

export { Course };
