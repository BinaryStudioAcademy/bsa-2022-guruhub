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
    modules,
    dataStatus,
    passedInterviewsCategoryIds,
    user,
    mentors,
    mentor,
    mentees,
    isMentorChoosingEnabled,
    isMentor,
    menteesByCourseDataStatus,
    mentorCheckDataStatus,
  } = useAppSelector(({ auth, course }) => ({
    categories: course.categories,
    course: course.course,
    modules: course.modules,
    dataStatus: course.dataStatus,
    passedInterviewsCategoryIds: course.passedInterviewsCategoryIds,
    user: auth.user,
    mentors: course.mentors,
    mentor: course.mentor,
    isMentorChoosingEnabled: course.isMentorChoosingEnabled,
    mentees: course.menteesByCourseId,
    isMentor: course.isMentor,
    menteesByCourseDataStatus: course.menteesByCourseDataStatus,
    mentorCheckDataStatus: course.mentorCheckDataStatus,
  }));
  const { id } = useParams();
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
        courseId: Number(id),
        filteringOpts: { mentorName },
      }),
    );
  };

  const handleEditCategorySubmit = (
    payload: CourseUpdateCategoryRequestDto,
  ): void => {
    const { newCategoryId } = payload;
    dispatch(
      courseActions.updateCategory({ courseId: Number(id), newCategoryId }),
    )
      .unwrap()
      .then(() => {
        handleUpdateCategoryModalToggle();
      });
  };

  useEffect(() => {
    dispatch(courseActions.getCourse({ id: Number(id) }));
    dispatch(courseActions.getModules({ courseId: Number(id) }));
    dispatch(courseActions.getCategories());

    if (user) {
      dispatch(
        courseActions.getMentorsByCourseId({
          courseId: Number(id),
          filteringOpts: { mentorName: '' },
        }),
      );
      dispatch(courseActions.getMenteesByCourseId({ id: Number(id) }));
      dispatch(
        courseActions.getMentor({
          courseId: Number(id),
          menteeId: user.id,
        }),
      );
      dispatch(courseActions.updateIsMentorChoosingEnabled(Number(id)));
    }

    return () => {
      dispatch(courseActions.disableMentorChoosing());
      dispatch(courseActions.cleanMentor());
      dispatch(courseActions.cleanMentors());
    };
  }, [dispatch, id, user]);

  useEffect(() => {
    if (course && user) {
      dispatch(courseActions.updateIsMentorBecomingEnabled());
    }

    return () => {
      dispatch(courseActions.disableMentorBecoming());
    };
  }, [user, course, passedInterviewsCategoryIds]);

  useEffect(() => {
    if (user) {
      dispatch(courseActions.getPassedInterviewsCategoryIdsByUserId(user.id));
    }
    dispatch(courseActions.checkIsMentor({ id: Number(id) }));
  }, [user]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>There is no course with provided id</p>
    );
  }

  const isUserAuthorized = Boolean(user);

  const handleMentorOrStudentComponentOutput = (): ReactNode => {
    if (isMentor) {
      return (
        menteesByCourseDataStatus === DataStatus.FULFILLED && (
          <MyStudentsContainer mentees={mentees} />
        )
      );
    }

    if (isMentorChoosingEnabled) {
      return <ChooseMentorButton onClick={handleChooseMentorModalToggle} />;
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
          <ModulesCardsContainer modules={modules} />
        </div>
      </div>

      {isUserAuthorized && mentorCheckDataStatus === DataStatus.FULFILLED && (
        <div className={styles.additional}>
          {handleMentorOrStudentComponentOutput()}
        </div>
      )}
    </div>
  );
};

export { Course };
