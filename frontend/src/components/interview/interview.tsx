import { DataStatus } from 'common/enums/enums';
import {
  FC,
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestDto,
} from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { InterviewItem } from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { interview, dataStatus, interviewers } = useAppSelector((state) => ({
    interview: state.interview.interview,
    dataStatus: state.interview.dataStatus,
    interviewers: state.interview.interviewers,
  }));

  useEffect(() => {
    dispatch(interviewActions.getInterview({ id: Number(id) }));
  }, []);

  useEffect(() => {
    if (interview) {
      dispatch(
        interviewActions.getInterviewersByCategory({
          categoryId: interview.courseCategory.id,
        }),
      );
    }
  }, [interview]);

  const handleUpdateInterview = (payload: InterviewsUpdateRequestDto): void => {
    dispatch(interviewActions.updateInterview({ id: Number(id), payload }));
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      {interview && (
        <InterviewItem
          interview={interview as InterviewsGetAllItemResponseDto}
          handleUpdateInterview={handleUpdateInterview}
          interviewers={interviewers}
        />
      )}
    </div>
  );
};

export { Interview };
