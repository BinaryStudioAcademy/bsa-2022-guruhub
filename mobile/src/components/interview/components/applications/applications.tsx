import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { InterviewsUpdateRequestDto } from '~/common/types/types';
import { ScrollView, Spinner, Text } from '~/components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { interviewActions } from '~/store/actions';

import { InterviewParameters } from './components/components';
import { styles } from './styles';

const Applications: FC = () => {
  const { interview, interviewers, interviewDataStatus, user } = useAppSelector(
    ({ auth, interview }) => ({
      user: auth.user,
      interview: interview.interview,
      interviewers: interview.interviewers,
      interviewDataStatus: interview.interviewDataStatus,
      interviewersDataStatus: interview.interviewersDataStatus,
    }),
  );
  const dispatch = useAppDispatch();

  const isInterviewLoading = interviewDataStatus === DataStatus.PENDING;

  const handleUpdateInterview = (payload: InterviewsUpdateRequestDto): void => {
    if (interview) {
      dispatch(
        interviewActions.updateInterview({ id: interview?.id, payload }),
      );
    }
  };

  useEffect(() => {
    if (interview) {
      dispatch(
        interviewActions.getInterviewersByCategory({
          categoryId: interview?.courseCategory.id,
        }),
      );
    }
  }, [interview]);

  if (isInterviewLoading) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.title}>Application for an interview</Text>
      {interview && (
        <InterviewParameters
          interview={interview}
          isInterviewLoading={isInterviewLoading}
          interviewers={interviewers}
          user={user}
          handleUpdateInterview={handleUpdateInterview}
        />
      )}
    </ScrollView>
  );
};

export { Applications };
