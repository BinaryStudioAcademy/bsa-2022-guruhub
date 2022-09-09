import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Button, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import {
  AddCourseModal,
  CategoriesList,
  CoursesList,
} from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { user, categories, dataStatus, courses } = useAppSelector((state) => ({
    user: state.auth.user,
    categories: state.dashboard.categories,
    dataStatus: state.dashboard.dataStatus,
    courses: state.dashboard.courses,
  }));

  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);
  const hasUser = Boolean(user);

  useEffect(() => {
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
          {hasUser && (
            <div>
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
        <CoursesList courses={courses} />
      )}
    </div>
  );
};

export { Dashboard };
