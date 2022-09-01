import React, { FC } from 'react';

import { CourseGetRequestParamsDto } from '~/common/types/types';
import { Stack, Text, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { interviewActions } from '~/store/actions';

import { ApplicationCard } from './components/components';
import { styles } from './styles';

const OtherApplications: FC = () => {
  const dispatch = useAppDispatch();
  const { otherInterviews, totalOtherInterviewsNumber } = useAppSelector(
    (state) => state.interview,
  );

  useEffect(() => {
    dispatch(
      interviewActions.getOtherByInterviewId({
        // for now id 2 after we get id from state (Dmitrij Revenets PR GRHB-356)
        interviewId: 2,
        // Maybe we don't need pagination on mobile but we have
        // in shared folder type InterviewsGetOtherRequestDto with pagination.
        // Create new type or leave it like that ?
        page: 1,
        count: totalOtherInterviewsNumber,
      }),
    );
  }, []);

  const handleApplicationCard = (_id: CourseGetRequestParamsDto): void => {
    // TODO: go to interviews/:id
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Applications</Text>
      <Stack space={15}>
        {otherInterviews.map((interview) => {
          return (
            <ApplicationCard
              key={interview.id}
              interview={interview}
              onCardPress={handleApplicationCard}
            />
          );
        })}
      </Stack>
    </View>
  );
};

export { OtherApplications };
