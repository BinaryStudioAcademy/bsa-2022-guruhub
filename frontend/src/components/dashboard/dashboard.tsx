import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { dashboardActions } from 'store/actions';

import { Courses } from './components/components';

const Dashboard: FC = () => {
  const { dataStatus } = useAppSelector((state) => state.dashboard);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(dashboardActions.getCourses());
  }, [dispatch]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div>
      <Courses />
    </div>
  );
};

export { Dashboard };
