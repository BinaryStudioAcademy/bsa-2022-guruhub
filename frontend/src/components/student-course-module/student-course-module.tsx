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
import { studentCourseModuleActions } from 'store/actions';

import { TaskManipulate, TaskNotes } from './components/components';
import styles from './styles.module.scss';

const StudentCourseModule: FC = () => {
  const { courseId, moduleId, studentId } = useParams();
  const { dataStatus, module, notes, task, user } = useAppSelector((state) => ({
    dataStatus: state.studentCourseModule.dataStatus,
    module: state.studentCourseModule.module,
    notes: state.studentCourseModule.notes,
    task: state.studentCourseModule.task,
    isMentor: state.courseModule.isMentor,
    user: state.auth.user,
  }));
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (module) {
      dispatch(
        studentCourseModuleActions.getTask({
          courseId: Number(courseId),
          moduleId: Number(moduleId),
          menteeId: Number(studentId),
        }),
      );
    }
  }, [courseId, moduleId, studentId, module]);

  useEffect(() => {
    dispatch(
      studentCourseModuleActions.getModuleById({
        courseId: Number(courseId),
        moduleId: Number(moduleId),
      }),
    );
  }, [courseId, moduleId]);

  useEffect(() => {
    if (task) {
      dispatch(studentCourseModuleActions.getNotes({ taskId: task.id }));
    }
  }, [task]);

  const handleManipulateNote = (
    payload: TaskNoteManipulateRequestBodyDto,
  ): void => {
    dispatch(
      studentCourseModuleActions.createNote({
        body: payload,
        taskId: (task as TaskGetItemReponseDto).id,
      }),
    );
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

  if (!task) {
    return (
      <p className={styles.placeholder}>Task for this module does not exist.</p>
    );
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
          <p>{module?.courseTitle}</p>
        </div>
        <h1 className={styles.courseName}>{module?.courseTitle}</h1>
        <div className={styles.moduleNameContainer}>
          <div className={styles.moduleNameContent}>
            <h4>{module?.title}</h4>
            <Content
              html={module?.description ?? ''}
              className={styles.moduleDescription}
            />
          </div>
        </div>
        <Content html={module?.description ?? ''} />
      </div>
      <div>
        {user && task.status !== TaskStatus.COMPLETED && (
          <TaskManipulate onApprove={handleApprove} onReject={handleReject} />
        )}
        {user && task && <TaskNotes notes={notes} />}
      </div>
    </div>
  );
};

export { StudentCourseModule };
