import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, CoursesList, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { dashboardActions, userDetailsActions } from 'store/actions';

import { AddCourseModal, CategoriesList } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { user, categories, dataStatus, courses } = useAppSelector((state) => ({
    user: state.auth.user,
    categories: state.dashboard.categories,
    dataStatus: state.dashboard.dataStatus,
    courses: state.dashboard.courses,
  }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] =
    useState<boolean>(false);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (user) {
      dispatch(userDetailsActions.getUserDetails());
    }
    dispatch(dashboardActions.getCourses({ title: '', categoryKey: '' }));
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headingText}>Courses</h1>
          <div className={styles.buttonWrapper}>
            <Button
              label="+ Add new course"
              btnColor="blue"
              to={!hasUser ? AppRoute.SIGN_IN : null}
              onClick={handleNewCourseModalToggle}
            />
          </div>
          <AddCourseModal
            isModalOpen={isNewCourseModalOpen}
            onModalToggle={handleNewCourseModalToggle}
          />
        </div>
        <CategoriesList items={categories} />
      </div>
      {dataStatus === DataStatus.PENDING ? (
        <Spinner />
      ) : (
        <CoursesList courses={courses} />
      )}
    </div>
  );
};

export { Dashboard };
