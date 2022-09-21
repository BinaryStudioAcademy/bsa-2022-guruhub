import {
  AppRoute,
  DataStatus,
  PaginationDefaultValue,
  SearchValue,
} from 'common/enums/enums';
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
  usePagination,
  useSearchParams,
  useState,
} from 'hooks/hooks';
import { dashboardActions, userDetailsActions } from 'store/actions';

import { carouselResponsiveBreakpoints } from './common';
import { AddCourseModal, CategoriesList } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { handlePageChange } = usePagination({
    queryName: 'page',
  });

  const [searchParams] = useSearchParams();

  const title = searchParams.get(SearchValue.TITLE);
  const category = searchParams.get(SearchValue.CATEGORY);
  const pageFromParams = searchParams.get(SearchValue.PAGE)
    ? Number(searchParams.get(SearchValue.PAGE))
    : PaginationDefaultValue.DEFAULT_PAGE;

  const {
    user,
    categories,
    dataStatus,
    courses,
    totalCoursesCount,
    popularCourses,
  } = useAppSelector((state) => ({
    user: state.auth.user,
    categories: state.dashboard.categories,
    dataStatus: state.dashboard.dataStatus,
    courses: state.dashboard.courses,
    popularCourses: state.dashboard.popularCourses,
    totalCoursesCount: state.dashboard.totalCoursesCount,
  }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] =
    useState<boolean>(false);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (user) {
      dispatch(userDetailsActions.getUserDetails());
    }
    dispatch(dashboardActions.getPopularCourses());
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      dashboardActions.getCourses({
        title: title ?? '',
        categoryKey: category ?? '',
        page: pageFromParams,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_20,
      }),
    );
  }, [pageFromParams]);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.carouselWrapper}>
        <h1>Most Popular</h1>
        <Carousel responsive={carouselResponsiveBreakpoints} hasArrows>
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
          <CoursesList
            courses={courses}
            currentPage={pageFromParams}
            onPageChange={handlePageChange}
            pageSize={PaginationDefaultValue.DEFAULT_COUNT_BY_20}
            totalCount={totalCoursesCount}
          />
        )}
      </div>
    </div>
  );
};

export { Dashboard };
