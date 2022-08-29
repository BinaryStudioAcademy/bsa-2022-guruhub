import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
  useParams,
  useState,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import {
  HistorySection,
  OtherApplicationsTable,
} from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const { notes, otherInterviews, totalOtherInterviewsNumber, dataStatus } =
    useAppSelector((state) => state.interview);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { page, handlePageChange } = usePagination({
    queryName: 'otherInterviews',
  });

  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

  useEffect(() => {
    dispatch(interviewActions.getNotes({ interviewId: Number(id) }));
    dispatch(
      interviewActions.getOtherByInterviewId({
        interviewId: Number(id),
        page,
        count: PaginationDefaultValue.DEFAULT_COUNT,
      }),
    );
  }, [page, id]);

  const handleNoteTextAreaToggle = (): void => {
    setIsInputOpen((prev) => !prev);
  };

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        <h1>Other Applications</h1>
        <OtherApplicationsTable
          interviews={otherInterviews}
          page={page}
          onPageChange={handlePageChange}
          totalOtherInterviewsNumber={totalOtherInterviewsNumber}
        />
      </div>
      <HistorySection
        interviewId={Number(id)}
        notes={notes}
        isOpen={isInputOpen}
        onToggle={handleNoteTextAreaToggle}
      />
    </div>
  );
};

export { Interview };
