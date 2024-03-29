import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { AppRoute, DataStatus, PermissionKey } from 'common/enums/enums';
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
  useNavigate,
  useParams,
  useState,
} from 'hooks/hooks';
import { ReactNode } from 'react';
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
    activeInterviewsCategoriesIds,
    user,
    mentors,
    mentor,
    mentees,
    modules,
    tasks,
    isMentorChoosingEnabled,
    isMentor,
    menteesByCourseDataStatus,
    mentorCheckDataStatus,
  } = useAppSelector(({ auth, course }) => ({
    categories: course.categories,
    course: course.course,
    dataStatus: course.dataStatus,
    passedInterviewsCategoryIds: course.passedInterviewsCategoryIds,
    activeInterviewsCategoriesIds: course.activeInterviewsCategoryIds,
    user: auth.user,
    mentors: course.mentors,
    mentor: course.mentor,
    modules: course.modules,
    tasks: course.tasks,
    isMentorChoosingEnabled: course.isMentorChoosingEnabled,
    mentees: course.menteesByCourseId,
    isMentor: course.isMentor,
    menteesByCourseDataStatus: course.menteesByCourseDataStatus,
    mentorCheckDataStatus: course.mentorCheckDataStatus,
  }));
  const { courseId, studentId } = useParams();
  const isMentorView = Boolean(studentId);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isCategoryEditAllowed = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const isUserAuthorized = Boolean(user);

  const hasAuthorizedConditions =
    isUserAuthorized && mentorCheckDataStatus === DataStatus.FULFILLED;
  const hasUnauthorizedConditions = !isUserAuthorized;

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);

  const handleUpdateCategoryModalToggle = (): void => {
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  const [isChooseMentorModalOpen, setChooseMentorModalOpen] =
    useState<boolean>(false);

  const handleRedirectUnauthorized = (): void => {
    navigate(AppRoute.SIGN_IN);
  };

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
      dispatch(
        courseActions.getMentor({
          courseId: Number(courseId),
          menteeId: user.id,
        }),
      );
      dispatch(courseActions.getActiveInterviewsCategoryIdsByUserId(user.id));
    }

    return () => {
      dispatch(courseActions.disableMentorChoosing());
      dispatch(courseActions.cleanMentor());
      dispatch(courseActions.cleanMentors());
      dispatch(courseActions.cleanMentees());
    };
  }, [dispatch, courseId, user]);

  useEffect(() => {
    if (course && user) {
      dispatch(courseActions.updateIsMentorBecomingEnabled(user.id));
      dispatch(courseActions.updateIsMentorChoosingEnabled(Number(courseId)));
    }

    return () => {
      dispatch(courseActions.disableMentorBecoming());
    };
  }, [
    user,
    course,
    passedInterviewsCategoryIds,
    activeInterviewsCategoriesIds,
  ]);

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

  useEffect(() => {
    if (isMentorView) {
      dispatch(
        courseActions.checkIsMentorForMentee({
          courseId: Number(courseId),
          menteeId: Number(studentId),
        }),
      );
    }
  }, [studentId, courseId, isMentorView]);

  useEffect(() => {
    if (user) {
      dispatch(courseActions.getPassedInterviewsCategoryIdsByUserId(user.id));
      dispatch(courseActions.checkIsMentor({ id: Number(courseId) }));
    }
  }, [user]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>There is no course with provided id</p>
    );
  }

  const handleMentorOrStudentComponentOutput = (): ReactNode => {
    if (isMentor) {
      return (
        menteesByCourseDataStatus === DataStatus.FULFILLED && (
          <MyStudentsContainer mentees={mentees} courseId={Number(courseId)} />
        )
      );
    }

    if (isMentorChoosingEnabled) {
      return <ChooseMentorButton onClick={handleChooseMentorModalToggle} />;
    }

    if (!isUserAuthorized) {
      return <ChooseMentorButton onClick={handleRedirectUnauthorized} />;
    }

    return (
      mentor && (
        <MyMentor
          mentor={mentor}
          onMentorChange={handleChooseMentorModalToggle}
        />
      )
    );
  };

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
          <h1 className={styles.title}>{course?.title}</h1>
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

      {(hasAuthorizedConditions || hasUnauthorizedConditions) && (
        <div className={styles.additional}>
          {handleMentorOrStudentComponentOutput()}
        </div>
      )}
    </div>
  );
};

export { Course };
