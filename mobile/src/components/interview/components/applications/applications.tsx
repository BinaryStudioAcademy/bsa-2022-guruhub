import React, { FC } from 'react';

import { DataStatus, PaginationDefaultValue } from '~/common/enums/enums';
import { InterviewsUpdateRequestDto } from '~/common/types/types';
import { ScrollView, Spinner, Text, View } from '~/components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  usePagination,
} from '~/hooks/hooks';
import { interviewActions } from '~/store/actions';

import { ApplicationForm, OtherApplications } from './components/components';
import { styles } from './styles';

const Applications: FC = () => {
  const {
    interview,
    interviewers,
    interviewDataStatus,
    otherInterviews,
    totalOtherInterviewsNumber,
    user,
  } = useAppSelector(({ auth, interview }) => ({
    user: auth.user,
    interview: interview.interview,
    interviewers: interview.interviewers,
    interviewDataStatus: interview.interviewDataStatus,
    interviewersDataStatus: interview.interviewersDataStatus,
    otherInterviews: interview.otherInterviews,
    totalOtherInterviewsNumber: interview.totalOtherInterviewsNumber,
  }));
  const dispatch = useAppDispatch();
  const { page, handlePageChange } = usePagination();

  const isInterviewLoading = interviewDataStatus === DataStatus.PENDING;

  const handleUpdateInterview = (payload: InterviewsUpdateRequestDto): void => {
    if (interview) {
      dispatch(interviewActions.updateInterview({ id: interview.id, payload }));
    }
  };

  useEffect(() => {
    if (interview) {
      dispatch(
        interviewActions.getInterviewersByCategory({
          categoryId: interview.courseCategory.id,
        }),
      );
    }
  }, [interview]);

  useEffect(() => {
    if (interview) {
      dispatch(
        interviewActions.getOtherByInterviewId({
          interviewId: interview.id,
          page,
          count: PaginationDefaultValue.DEFAULT_COUNT,
        }),
      );
    }
  }, [page, interview?.id]);

  if (isInterviewLoading) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.wrapper}>
        <Text style={styles.title}>Application for an interview</Text>
        {interview && (
          <ApplicationForm
            interview={interview}
            isInterviewLoading={isInterviewLoading}
            interviewers={interviewers}
            user={user}
            handleUpdateInterview={handleUpdateInterview}
          />
        )}
        <OtherApplications
          interviews={otherInterviews}
          page={page}
          onPageChange={handlePageChange}
          totalOtherInterviewsNumber={totalOtherInterviewsNumber}
        />
      </View>
    </ScrollView>
  );
};

export { Applications };
