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

import { AddCourseModal, Courses } from './components/components';
import styles from './styles.module.scss';

const Dashboard: FC = () => {
  const [isNewCourseModalOpen, setIsNewCourseModalOpen] = useState(false);

  const { dataStatus } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardActions.getCourses());
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  const handleNewCourseModalToggle = (): void => {
    setIsNewCourseModalOpen(!isNewCourseModalOpen);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.headerTitle}>Course</h1>
        <Button label="+ Add new course" onClick={handleNewCourseModalToggle} />
        <AddCourseModal
          isModalOpen={isNewCourseModalOpen}
          onModalToggle={handleNewCourseModalToggle}
        />
      </div>
      <Courses />
    </div>
  );
};

export { Dashboard };
