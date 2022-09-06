import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Category, Content, Image, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { studentCourseActions } from 'store/actions';

import { ModulesCardsContainer } from './components/components';
import styles from './styles.module.scss';

const StudentCourse: FC = () => {
  const { studentId, courseId } = useParams();
  const dispatch = useAppDispatch();
  const { dataStatus, tasks, course } = useAppSelector(
    (state) => state.studentCourse,
  );

  useEffect(() => {
    dispatch(
      studentCourseActions.getTasksByCourseIdAndMenteeId({
        courseId: Number(courseId),
        menteeId: Number(studentId),
      }),
    );
  }, [studentId, courseId]);

  useEffect(() => {
    dispatch(studentCourseActions.getCourseById({ id: Number(courseId) }));
  }, [courseId]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>Course with this ID does not exist.</p>
    );
  }

  const hasTasks = Boolean(tasks.length);

  if (!hasTasks) {
    return (
      <p className={styles.placeholder}>There are no tasks for this course</p>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.categoryContainer}>
          <Category
            name={course.category?.name ?? 'Unknown'}
            keyName={course.category?.key ?? 'unknown'}
          />
        </div>
        <div className={styles.image}>
          <Image
            alt="course image"
            src={course?.imageUrl ?? defaultCourseImage}
            width="100%"
            height="100%"
          />
        </div>
        <h2 className={styles.about}>About this course</h2>
        <Content html={course?.description ?? ''} />
        <h3 className={styles.modulesContentHeader}>Course Content</h3>
        <div className={styles.modulesContainer}>
          <ModulesCardsContainer
            tasks={tasks}
            studentId={Number(studentId)}
            courseId={Number(courseId)}
          />
        </div>
      </div>
    </div>
  );
};

export { StudentCourse };
