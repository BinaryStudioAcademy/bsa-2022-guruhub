import {
  AppRoute,
  DataStatus,
  PaginationDefaultValue,
} from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, CoursesList, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useSearchParams,
  useState,
} from 'hooks/hooks';
import { dashboardActions, userDetailsActions } from 'store/actions';

import { AddCourseModal, CategoriesList } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { handlePageChange } = usePagination({
    queryName: 'page',
  });

  const [searchParams] = useSearchParams();

  const title = searchParams.get('title');
  const category = searchParams.get('category');
  const pageFromParams = searchParams.get('page');

  const { user, categories, dataStatus, courses, totalCoursesCount } =
    useAppSelector((state) => ({
      user: state.auth.user,
      categories: state.dashboard.categories,
      dataStatus: state.dashboard.dataStatus,
      courses: state.dashboard.courses,
      totalCoursesCount: state.dashboard.totalCoursesCount,
    }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] =
    useState<boolean>(false);
  const hasUser = Boolean(user);

  useEffect(() => {
    if (user) {
      dispatch(userDetailsActions.getUserDetails());
    }
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      dashboardActions.getCourses({
        title: title ?? '',
        categoryKey: category ?? '',
        page: pageFromParams
          ? Number(pageFromParams)
          : PaginationDefaultValue.DEFAULT_PAGE,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_20,
      }),
    );
  }, [pageFromParams]);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
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
          currentPage={
            pageFromParams
              ? Number(pageFromParams)
              : PaginationDefaultValue.DEFAULT_PAGE
          }
          onPageChange={handlePageChange}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT_BY_20}
          totalCount={totalCoursesCount}
        />
      )}
    </div>
  );
};

export { Dashboard };
