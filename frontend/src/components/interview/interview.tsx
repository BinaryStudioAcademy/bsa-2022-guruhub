import { DataStatus, PaginationDefaultValue } from 'common/enums/enums';
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
  usePagination,
  useParams,
  useState,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import {
  HistorySection,
  InterviewItem,
  OtherApplicationsTable,
} from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { page, handlePageChange } = usePagination({
    queryName: 'otherInterviews',
  });
  const {
    notes,
    otherInterviews,
    totalOtherInterviewsNumber,
    interview,
    dataStatus,
    interviewers,
  } = useAppSelector((state) => ({
    interview: state.interview.interview,
    dataStatus: state.interview.dataStatus,
    interviewers: state.interview.interviewers,
    notes: state.interview.notes,
    otherInterviews: state.interview.otherInterviews,
    totalOtherInterviewsNumber: state.interview.totalOtherInterviewsNumber,
  }));
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);

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
      {interview && (
        <InterviewItem
          interview={interview as InterviewsGetAllItemResponseDto}
          handleUpdateInterview={handleUpdateInterview}
          interviewers={interviewers}
        />
      )}
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
