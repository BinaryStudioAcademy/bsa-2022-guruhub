import defaultCourseImage from 'assets/img/default-course-image.jpeg';
import { DataStatus, PermissionKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  Category,
  Content,
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

import { EditCategoryModal } from './components/components';
import { ModulesCardsContainer } from './components/modules-cards-container/modules-cards-container';
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
  } = useAppSelector((state) => ({ ...state.course, ...state.auth }));
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const isCategoryEditAllowed = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_CATEGORIES],
    userPermissions: user?.permissions ?? [],
  });

  const [isUpdateCategoryModalOpen, setUpdateCategoryModalOpen] =
    useState<boolean>(false);

  const handleUpdateCategoryModalToggle = (evt: React.MouseEvent): void => {
    evt?.stopPropagation();
    setUpdateCategoryModalOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(courseActions.getCourse({ id: Number(id) }));
    dispatch(courseActions.getModules({ courseId: Number(id) }));
    dispatch(courseActions.getMentorsByCourseId({ id: Number(id) }));
    dispatch(courseActions.getCategories());
  }, [dispatch, id]);

  useEffect(() => {
    if (user) {
      dispatch(courseActions.getPassedInterviewsCategoryIdsByUserId(user.id));
    }
  }, [user]);

  useEffect(() => {
    const isMentorButtonVisible =
      user &&
      course &&
      course.courseCategoryId &&
      !mentors.find((mentor) => mentor.id === user.id);

    dispatch(
      courseActions.setIsMentorButtonVisible(Boolean(isMentorButtonVisible)),
    );

    return () => {
      dispatch(courseActions.setIsMentorButtonVisible(false));
    };
  }, [user, course, passedInterviewsCategoryIds]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  if (!course) {
    return (
      <p className={styles.placeholder}>There is no course with provided id</p>
    );
  }

  return (
    <div className={styles.container}>
      <EditCategoryModal
        courseId={course.id}
        defaultCategoryId={course.category?.id}
        isOpen={isUpdateCategoryModalOpen}
        categories={categories}
        onModalToggle={handleUpdateCategoryModalToggle}
      />
      <div className={styles.info}>
        <div className={styles.courseHeadingContainer}>
          <h1>{course?.title}</h1>
          {isCategoryEditAllowed && (
            <>
              <IconButton
                label="edit category"
                iconName="edit"
                onClick={handleUpdateCategoryModalToggle}
              />
            </>
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

      <div className={styles.additional}></div>
    </div>
  );
};

export { Course };
