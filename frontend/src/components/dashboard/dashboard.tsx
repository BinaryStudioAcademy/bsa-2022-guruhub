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
  Courses,
} from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.dashboard);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  const { dataStatus } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(dashboardActions.getCourses());
    dispatch(dashboardActions.getCategories());
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headingText}>Course</h1>
          <Button
            label="+ Add new course"
            onClick={handleNewCourseModalToggle}
          />
          <AddCourseModal
            isModalOpen={isNewCourseModalOpen}
            onModalToggle={handleNewCourseModalToggle}
          />
        </div>
        <CategoriesList items={categories} />
      </div>
      <Courses />
    </div>
  );
};

export { Dashboard };
