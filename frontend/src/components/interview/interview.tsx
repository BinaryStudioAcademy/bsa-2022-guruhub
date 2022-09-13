import {
  DataStatus,
  PaginationDefaultValue,
  PermissionKey,
} from 'common/enums/enums';
import {
  FC,
  InterviewsGetAllItemResponseDto,
  InterviewsUpdateRequestDto,
  UserWithPermissions,
} from 'common/types/types';
import { Spinner } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';
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
    user,
  } = useAppSelector((state) => ({
    interview: state.interview.interview,
    dataStatus: state.interview.dataStatus,
    interviewers: state.interview.interviewers,
    notes: state.interview.notes,
    otherInterviews: state.interview.otherInterviews,
    totalOtherInterviewsNumber: state.interview.totalOtherInterviewsNumber,
    user: state.auth.user,
  }));
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const hasInterview = Boolean(interview);
  const hasPermissionToSelectInterviewer = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
    userPermissions: (user as UserWithPermissions).permissions,
  });
  const hasManageInterviewPermissions = checkHasPermission({
    permissionKeys: [PermissionKey.MANAGE_INTERVIEW],
    userPermissions: (user as UserWithPermissions).permissions,
  });
  const isInterviewerOrInterviewee =
    interview?.interviewee.id === user?.id ||
    interview?.interviewer?.id === user?.id;

  useEffect(() => {
    dispatch(interviewActions.getInterview({ id: Number(id) }));
  }, []);

  useEffect(() => {
    if (!hasInterview) {
      return;
    }

    if (hasPermissionToSelectInterviewer) {
      dispatch(
        interviewActions.getInterviewersByCategory({
          categoryId: (interview as InterviewsGetAllItemResponseDto)
            .courseCategory.id,
        }),
      );
    }

    if (
      hasManageInterviewPermissions &&
      !hasPermissionToSelectInterviewer &&
      !isInterviewerOrInterviewee
    ) {
      dispatch(interviewActions.handleUserHasNoPermission());
    }
  }, [hasInterview]);

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

  if (!hasInterview) {
    return (
      <p className={styles.noSuchInterview}>
        There is no interview with such an id
      </p>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>
        {interview && (
          <InterviewItem
            interview={interview as InterviewsGetAllItemResponseDto}
            handleUpdateInterview={handleUpdateInterview}
            interviewers={interviewers}
            hasPermissionToSelectInterviewer={hasPermissionToSelectInterviewer}
          />
        )}
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
