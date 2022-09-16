import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, CoursesList, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useState,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { AddCourseModal, CategoriesList } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { page, handlePageChange } = usePagination({
    queryName: 'dashboardPage',
  });

  const { user, categories, dataStatus, courses, totalCoursesCount } =
    useAppSelector((state) => ({
      user: state.auth.user,
      categories: state.dashboard.categories,
      dataStatus: state.dashboard.dataStatus,
      courses: state.dashboard.courses,
      totalCoursesCount: state.dashboard.totalCoursesCount,
    }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const hasUser = Boolean(user);

  useEffect(() => {
    dispatch(
      dashboardActions.getCourses({
        title: '',
        categoryKey: '',
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_10,
      }),
    );
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      dashboardActions.getCourses({
        title: '',
        categoryKey: '',
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT_BY_10,
      }),
    );
  }, [page]);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headingText}>Courses</h1>
          {hasUser && (
            <div className={styles.buttonWrapper}>
              <Button
                label="+ Add new course"
                btnColor="blue"
                onClick={handleNewCourseModalToggle}
              />
            </div>
          )}
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
        <CoursesList
          courses={courses}
          currentPage={page}
          onPageChange={handlePageChange}
          pageSize={PaginationDefaultValue.DEFAULT_COUNT_BY_10}
          totalCount={totalCoursesCount}
        />
      )}
    </div>
  );
};

export { Dashboard };
