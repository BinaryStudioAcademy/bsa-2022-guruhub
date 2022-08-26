import { FC } from 'common/types/types';
import { useEffect, useParams } from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { DataStatus } from '../../common/enums/app/data-status.enum';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch.hook';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector.hook';
import { Spinner } from '../common/spinner/spinner';
import { InterviewItem } from './components/interview-item/interview-item';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { interview, dataStatus } = useAppSelector((state) => ({
    interview: state.interview.interview,
    dataStatus: state.interview.dataStatus,
  }));

  useEffect(() => {
    dispatch(interviewActions.getInterview({ id: Number(id) }));
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <InterviewItem interview={interview} />
    </div>
  );
};

export { Interview };
