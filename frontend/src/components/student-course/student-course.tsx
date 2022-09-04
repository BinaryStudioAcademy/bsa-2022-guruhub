import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { studentCourseActions } from 'store/actions';

import { ModuleCard } from './components/components';
import styles from './styles.module.scss';

const StudentCourse: FC = () => {
  const { studentId, courseId } = useParams();
  const dispatch = useAppDispatch();
  const { dataStatus, modules } = useAppSelector(
    (state) => state.studentCourse,
  );

  useEffect(() => {
    dispatch(
      studentCourseActions.getModulesByCourseIdAndMentorId({
        courseId: Number(courseId),
        menteeId: Number(studentId),
      }),
    );
  }, [studentId, courseId]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <ul className={styles.container}>
      {modules.map((courseModule) => {
        return (
          <li key={courseModule.id} className={styles.moduleCardContainer}>
            <Link
              to={
                `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${courseId}${AppRoute.MODULES}/${courseModule.id}` as AppRoute
              }
              className={styles.linkToModule}
            >
              <ModuleCard
                title={courseModule.title}
                description={courseModule.description}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export { StudentCourse };
