import { PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { OtherApplications } from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const { otherInterviews, totalOtherInterviews } = useAppSelector(
    (state) => state.interview,
  );
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

  return (
    <div className={styles.wrapper}>
      <OtherApplications
        interviews={otherInterviews}
        page={page}
        onPageChange={handlePageChange}
        totalOtherInterviews={totalOtherInterviews}
      />
    </div>
  );
};

export { Interview };
