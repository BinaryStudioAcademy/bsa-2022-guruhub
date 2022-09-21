import { AppRoute, DataStatus, TaskStatus } from 'common/enums/enums';
import {
  FC,
  TaskGetItemReponseDto,
  TaskNoteFormRequestDto,
  TaskNoteManipulateRequestBodyDto,
} from 'common/types/types';
import { Content, Icon, Spinner } from 'components/common/common';
import { generateDynamicPath } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { Link } from 'react-router-dom';
import { courseModuleActions } from 'store/actions';

import { TaskManipulate, TaskNotes } from './components/components';
import styles from './styles.module.scss';

const CourseModule: FC = () => {
  const { courseId, moduleId, studentId } = useParams();
  const isMentorView = Boolean(studentId);
  const { dataStatus, courseModule, notes, task, isMentor, user, hasMentor } =
    useAppSelector((state) => ({
      dataStatus: state.courseModule.dataStatus,
      courseModule: state.courseModule.courseModule,
      notes: state.courseModule.notes,
      task: state.courseModule.task,
      isMentor: state.courseModule.isMentor,
      user: state.auth.user,
      hasMentor: state.courseModule.hasMentor,
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
    dispatch(courseModuleActions.checkHasMentor(Number(courseId)));
  }, [courseId]);

  useEffect(() => {
    if (task) {
      dispatch(courseModuleActions.getNotes({ taskId: task.id }));
    }
  }, [task]);

  useEffect(() => {
    if (isMentorView) {
      dispatch(
        courseModuleActions.checkIsMentorForMentee({
          courseId: Number(courseId),
          menteeId: Number(studentId),
        }),
      );
    }
  }, [courseId, studentId, isMentorView]);

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
    ? generateDynamicPath(AppRoute.STUDENTS_$ID_COURSES_$ID, {
        studentId: studentId as string,
        courseId: courseId as string,
      })
    : generateDynamicPath(AppRoute.COURSES_$ID, {
        courseId: courseId as string,
      });

  const canSeeTaskAbsencePlaceholder =
    !task && !isMentorView && !isMentor && hasMentor;

  const canManipulateTask =
    user && task && task.status !== TaskStatus.COMPLETED;

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.courseTitleContainer}>
          <Link className={styles.courseLink} to={backRoute as AppRoute}>
            <span className={styles.courseLinkIconWrapper}>
              <Icon name="leftArrow" />
            </span>
          </Link>
          {courseModule?.courseTitle}
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
      </div>
      <div className={styles.taskContainer}>
        {canManipulateTask && (
          <TaskManipulate
            onSendOnReview={handleSendOnReview}
            onApprove={handleApprove}
            onReject={handleReject}
            isMentorView={isMentorView}
          />
        )}
        {user && task && <TaskNotes notes={notes} />}
        {canSeeTaskAbsencePlaceholder && (
          <p className={styles.taskAbsenceTitle}>Task does not exist.</p>
        )}
      </div>
    </div>
  );
};

export { CourseModule };
