import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { DataStatus, PermissionKey } from 'common/enums/enums';
import { CourseUpdateCategoryRequestDto, FC } from 'common/types/types';
import {
  Category,
  Content,
  EditCategoryModal,
  IconButton,
  Image,
  Spinner,
} from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
} from 'hooks/hooks';
import { courseActions } from 'store/actions';

import {
  ChooseMentorButton,
  ChooseMentorModal,
  ModulesCardsContainer,
  MyMentor,
  MyStudentsContainer,
} from './components/components';
import styles from './styles.module.scss';

const Course: FC = () => {
  const {
    categories,
    course,
    dataStatus,
    passedInterviewsCategoryIds,
    user,
    mentors,
    mentor,
    mentees,
    modules,
    tasks,
    isMentorChoosingEnabled,
    isMentor,
    menteesByCourseDataStatus,
  } = useAppSelector(({ auth, course }) => ({
    categories: course.categories,
    course: course.course,
    dataStatus: course.dataStatus,
    passedInterviewsCategoryIds: course.passedInterviewsCategoryIds,
    user: auth.user,
    mentors: course.mentors,
    mentor: course.mentor,
    modules: course.modules,
    tasks: course.tasks,
    isMentorChoosingEnabled: course.isMentorChoosingEnabled,
    mentees: course.menteesByCourseId,
    isMentor: course.isMentor,
    menteesByCourseDataStatus: course.menteesByCourseDataStatus,
  }));
  const { courseId, studentId } = useParams();
  const isMentorView = Boolean(studentId);
  const dispatch = useAppDispatch();

  const isCategoryEditAllowed = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);

  const handleUpdateCategoryModalToggle = (): void => {
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  const [isChooseMentorModalOpen, setChooseMentorModalOpen] =
    useState<boolean>(false);

  const handleChooseMentorModalToggle = (): void => {
    setChooseMentorModalOpen((prev) => !prev);
  };

  const handleMentorSelectClick = (mentorId: number): void => {
    if (mentor) {
      dispatch(courseActions.changeMentor({ id: mentorId }))
        .unwrap()
        .then(() => {
          handleChooseMentorModalToggle();
        });

      return;
    }

    dispatch(courseActions.chooseMentor({ id: mentorId }))
      .unwrap()
      .then(() => {
        handleChooseMentorModalToggle();
      });
  };

  const handleMentorsSearch = (mentorName: string): void => {
    dispatch(
      courseActions.getMentorsByCourseId({
        courseId: Number(courseId),
        filteringOpts: { mentorName },
      }),
    );
  };

  const handleEditCategorySubmit = (
    payload: CourseUpdateCategoryRequestDto,
  ): void => {
    const { newCategoryId } = payload;
    dispatch(
      courseActions.updateCategory({
        courseId: Number(courseId),
        newCategoryId,
      }),
    )
      .unwrap()
      .then(() => {
        handleUpdateCategoryModalToggle();
      });
  };

  useEffect(() => {
    dispatch(courseActions.getCourse({ id: Number(courseId) }));
    dispatch(courseActions.getModules({ courseId: Number(courseId) }));
    dispatch(courseActions.getCategories());

    if (user && !isMentorView) {
      dispatch(
        courseActions.getMentorsByCourseId({
          courseId: Number(courseId),
          filteringOpts: { mentorName: '' },
        }),
      );
      dispatch(courseActions.getMenteesByCourseId({ id: Number(courseId) }));
    }
  }, [dispatch, courseId, user]);

  useEffect(() => {
    if (user) {
      dispatch(courseActions.getPassedInterviewsCategoryIdsByUserId(user.id));
      dispatch(
        courseActions.getMentor({
          courseId: Number(courseId),
          menteeId: user.id,
        }),
      );
    }
    dispatch(courseActions.checkIsMentor({ id: Number(courseId) }));
  }, [user]);

  useEffect(() => {
    if (course && user) {
      dispatch(courseActions.updateIsMentorBecomingEnabled());
    }

    if (course) {
      dispatch(courseActions.updateIsMentorChoosingEnabled());
    }

    return () => {
      dispatch(courseActions.disableMentorBecoming());
    };
  }, [user, course, passedInterviewsCategoryIds]);

  useEffect(() => {
    if (isMentorView) {
      dispatch(
        courseActions.getTasksByCourseIdAndMenteeId({
          courseId: Number(courseId),
          menteeId: Number(studentId),
        }),
      );
    }
  }, [studentId, courseId]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>There is no course with provided id</p>
    );
  }

  const isUserAuthorized = Boolean(user);
  const canSeeStudents =
    isMentor &&
    !isMentorView &&
    menteesByCourseDataStatus === DataStatus.FULFILLED;
  const canChooseMentor = isMentorChoosingEnabled && !isMentorView;

  return (
    <div className={styles.container}>
      <EditCategoryModal
        courseId={course.id}
        defaultCategoryId={course.category?.id}
        isOpen={isUpdateCategoryModalOpen}
        categories={categories}
        onModalToggle={handleUpdateCategoryModalToggle}
        onEditCategorySubmit={handleEditCategorySubmit}
      />
      <ChooseMentorModal
        isOpen={isChooseMentorModalOpen}
        onModalToggle={handleChooseMentorModalToggle}
        mentors={mentors}
        onMentorSelectClick={handleMentorSelectClick}
        onMentorSearch={handleMentorsSearch}
      />
      <div className={styles.info}>
        <div className={styles.headingWrapper}>
          <h1>{course?.title}</h1>
          {isCategoryEditAllowed && (
            <div className={styles.editButton}>
              <IconButton
                label="edit category"
                iconName="edit"
                onClick={handleUpdateCategoryModalToggle}
              />
            </div>
          )}
        </div>
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
            isMentorView={isMentorView}
            studentId={Number(studentId)}
            modules={modules}
            tasks={tasks}
            course={course}
          />
        </div>
      </div>

      {isUserAuthorized && (
        <div className={styles.additional}>
          {mentor && (
            <MyMentor
              mentor={mentor}
              onMentorChange={handleChooseMentorModalToggle}
            />
          )}
          {canSeeStudents && (
            <MyStudentsContainer
              mentees={mentees}
              courseId={Number(courseId)}
            />
          )}
          {canChooseMentor && (
            <ChooseMentorButton onClick={handleChooseMentorModalToggle} />
          )}
        </div>
      )}
    </div>
  );
};

export { Course };
