import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { OtherApplicationsTable } from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const { otherInterviews, totalOtherInterviewsNumber, dataStatus } =
    useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { page, handlePageChange } = usePagination({
    queryName: 'otherInterviews',
  });

  useEffect(() => {
    dispatch(
      interviewActions.getOtherByInterviewId({
        interviewId: Number(id),
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page, id]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <h1>Other Applications</h1>
      <OtherApplicationsTable
        interviews={otherInterviews}
        page={page}
        onPageChange={handlePageChange}
        totalOtherInterviewsNumber={totalOtherInterviewsNumber}
      />
    </div>
  );
};

export { Interview };
