import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Content, IconButton, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
} from 'hooks/hooks';
import { courseModuleActions } from 'store/actions';

import { TaskManipulate, TaskNotes } from './components/components';
import styles from './styles.module.scss';

const CourseModule: FC = () => {
  const [selectedUserId] = useState<number | null>(2);
  const { courseId, moduleId } = useParams();
  const { dataStatus, courseModule, notes, task } = useAppSelector(
    (state) => state.courseModule,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      courseModuleActions.getById({
        courseId: Number(courseId),
        moduleId: Number(moduleId),
      }),
    );
  }, []);

  useEffect(() => {
    if (task) {
      dispatch(courseModuleActions.getNotes({ taskId: task.id }));
    }
  }, [task]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(
        courseModuleActions.getTask({
          menteeId: selectedUserId,
          moduleId: Number(moduleId),
        }),
      );
    }
  }, [selectedUserId]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <IconButton
            label="back"
            iconName="leftArrow"
            to={`${AppRoute.COURSES}/${courseId}` as AppRoute}
            iconColor="blue"
          />
          <p>{courseModule?.courseTitle}</p>
        </div>
        <h1 className={styles.courseName}>{courseModule?.courseTitle}</h1>
        <div className={styles.moduleNameContainer}>
          <div className={styles.moduleNameContent}>
            <h4>{courseModule?.title}</h4>
            <Content
              html={courseModule?.description ?? ''}
              className={styles.moduleDescription}
            />
          </div>
        </div>
        <Content html={courseModule?.description ?? ''} />
      </div>
      <div>
        <TaskManipulate />
        <TaskNotes notes={notes} />
      </div>
    </div>
  );
};

export { CourseModule };
