import { FC } from 'common/types/types';
import { Button } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { CategoriesList } from './components/categories-list/categories-list';
import { AddCourseModal } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const dispatch = useAppDispatch();
  const { categories } = useAppSelector((state) => state.dashboard);
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  useEffect(() => {
    dispatch(dashboardActions.getCategories());
  }, []);

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>
          <h1 className={styles.headingText}>Courses</h1>
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
    </div>
  );
};

export { Dashboard };
