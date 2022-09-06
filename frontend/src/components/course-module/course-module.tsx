import { AppRoute, DataStatus, TaskStatus } from 'common/enums/enums';
import {
  FC,
  TaskGetItemReponseDto,
  TaskNoteFormRequestDto,
} from 'common/types/types';
import { Content, IconButton, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { courseModuleActions } from 'store/actions';

import { TaskManipulate, TaskNotes } from './components/components';
import styles from './styles.module.scss';

const CourseModule: FC = () => {
  const { courseId, moduleId } = useParams();
  const { dataStatus, courseModule, notes, isMentor, task, user } =
    useAppSelector((state) => ({
      dataStatus: state.courseModule.dataStatus,
      courseModule: state.courseModule.courseModule,
      notes: state.courseModule.notes,
      isMentor: state.courseModule.isMentor,
      task: state.courseModule.task,
      user: state.auth.user,
    }));
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
    dispatch(courseModuleActions.checkIsMentor(Number(courseId)));
  }, [courseId]);

  useEffect(() => {
    if (task) {
      dispatch(courseModuleActions.getNotes({ taskId: task.id }));
    }
  }, [task]);

  useEffect(() => {
    if (user && !isMentor && dataStatus === DataStatus.FULFILLED) {
      dispatch(
        courseModuleActions.getTask({
          menteeId: user.id,
          moduleId: Number(moduleId),
        }),
      );
    }
  }, [user, isMentor, dataStatus, moduleId]);

  const handleSendOnReview = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    const body = { note, status: TaskStatus.PENDING };
    dispatch(
      courseModuleActions.createNote({
        body,
        taskId: (task as TaskGetItemReponseDto).id,
      }),
    );
  };

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
        {user && task && task.status !== TaskStatus.COMPLETED && (
          <TaskManipulate onSendOnReview={handleSendOnReview} />
        )}
        {user && task && <TaskNotes notes={notes} />}
      </div>
    </div>
  );
};

export { CourseModule };
