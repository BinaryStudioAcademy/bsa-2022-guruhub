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
  useState,
} from 'hooks/hooks';
import { courseModuleActions } from 'store/actions';

import { TaskManipulate, TaskNotes } from './components/components';
import styles from './styles.module.scss';

const CourseModule: FC = () => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { courseId, moduleId } = useParams();
  const { dataStatus, courseModule, notes, task, isMentor, user } =
    useAppSelector((state) => ({
      ...state.courseModule,
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
    if (user) {
      setSelectedUserId(user.id);

      return;
    }
    setSelectedUserId(null);
  }, [user]);

  useEffect(() => {
    dispatch(courseModuleActions.checkIsMentor(Number(courseId)));
  }, [courseId]);

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
          <TaskManipulate
            onSendOnReview={handleSendOnReview}
            onApprove={handleApprove}
            onReject={handleReject}
            isMentor={isMentor}
          />
        )}
        {user && task && <TaskNotes notes={notes} />}
      </div>
    </div>
  );
};

export { CourseModule };
