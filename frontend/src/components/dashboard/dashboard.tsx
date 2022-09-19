import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  Button,
  Carousel,
  Course,
  CoursesList,
  Spinner,
} from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { dashboardActions, userDetailsActions } from 'store/actions';

import { carouselResponsiveBreakpoints } from './common';
import { AddCourseModal, CategoriesList } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { user, categories, dataStatus, courses, popularCourses } =
    useAppSelector((state) => ({
      user: state.auth.user,
      categories: state.dashboard.categories,
      dataStatus: state.dashboard.dataStatus,
      courses: state.dashboard.courses,
      popularCourses: state.dashboard.popularCourses,
    }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] =
    useState<boolean>(false);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (user) {
      dispatch(userDetailsActions.getUserDetails());
    }
    dispatch(dashboardActions.getCourses({ title: '', categoryKey: '' }));
    dispatch(dashboardActions.getPopularCourses());
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <h1>Most Popular</h1>
        <Carousel responsive={carouselResponsiveBreakpoints}>
          {popularCourses.map((popularCourse) => (
            <div className={styles.carouselElement} key={popularCourse.id}>
              <Course course={popularCourse} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.dashboard}>
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
        <div className={styles.categoriesWrapper}>
          <CategoriesList items={categories} />
        </div>
        {dataStatus === DataStatus.PENDING ? (
          <Spinner />
        ) : (
          <CoursesList courses={courses} popularCourses={popularCourses} />
        )}
      </div>
    </div>
  );
};

export { Dashboard };
