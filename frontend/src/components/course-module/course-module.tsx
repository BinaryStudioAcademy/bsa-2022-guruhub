import { AppRoute, DataStatus, TaskStatus } from 'common/enums/enums';
import {
  FC,
  TaskGetItemReponseDto,
  TaskNoteFormRequestDto,
  TaskNoteManipulateRequestBodyDto,
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
  const { courseId, moduleId, studentId } = useParams();
  const isMentorView = Boolean(studentId);
  const { dataStatus, courseModule, notes, task, isMentor, user } =
    useAppSelector((state) => ({
      dataStatus: state.courseModule.dataStatus,
      courseModule: state.courseModule.courseModule,
      notes: state.courseModule.notes,
      task: state.courseModule.task,
      isMentor: state.courseModule.isMentor,
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
    if (user) {
      const menteeId = isMentorView ? Number(studentId) : user.id;
      dispatch(
        courseModuleActions.getTask({
          menteeId,
          moduleId: Number(moduleId),
        }),
      );
    }
  }, [user, moduleId]);

  const handleManipulateNote = (
    payload: TaskNoteManipulateRequestBodyDto,
  ): void => {
    dispatch(
      courseModuleActions.createNote({
        body: payload,
        taskId: (task as TaskGetItemReponseDto).id,
      }),
    );
  };

  const handleSendOnReview = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.PENDING });
  };

  const handleApprove = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.COMPLETED });
  };

  const handleReject = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.REJECTED });
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  const backRoute = isMentorView
    ? `${AppRoute.STUDENTS}/${studentId}${AppRoute.COURSES}/${courseId}`
    : `${AppRoute.COURSES}/${courseId}`;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.buttonWrapper}>
          <IconButton
            label="back"
            iconName="leftArrow"
            to={backRoute as AppRoute}
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
          <TaskManipulate
            onSendOnReview={handleSendOnReview}
            onApprove={handleApprove}
            onReject={handleReject}
            isMentorView={isMentorView}
          />
        )}
        {user && task && <TaskNotes notes={notes} />}
        {!task && !isMentorView && !isMentor && (
          <p className={styles.taskAbsenceTitle}>Task does not exist.</p>
        )}
      </div>
    </div>
  );
};

export { CourseModule };
