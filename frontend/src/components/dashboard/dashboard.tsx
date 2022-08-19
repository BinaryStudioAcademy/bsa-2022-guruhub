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
  const { categories, dataStatus, courses } = useAppSelector(
    (state) => state.dashboard,
  );
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  useEffect(() => {
    dispatch(dashboardActions.getCourses({ title: '', categoryKey: '' }));
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  const handleNewCourseModalToggle = (e: React.MouseEvent | void): void => {
    e?.stopPropagation();
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headingText}>Courses</h1>
          <Button
            label="+ Add new course"
            btnColor="blue"
            onClick={handleNewCourseModalToggle}
          />
          <AddCourseModal
            isModalOpen={isNewCourseModalOpen}
            onModalToggle={handleNewCourseModalToggle}
          />
        </div>
        <CategoriesList items={categories} />
      </div>
      <CoursesList courses={courses} />
    </div>
  );
};

export { Dashboard };
