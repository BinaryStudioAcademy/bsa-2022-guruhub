import React, { FC } from 'react';

import {
  InterviewScreenName,
  PaginationDefaultValue,
} from '~/common/enums/enums';
import {
  InterviewsGetOtherItemResponseDto,
  InterviewsUpdateRequestParamsDto,
} from '~/common/types/types';
import {
  Category,
  Chip,
  Pagination,
  Table,
  Text,
  View,
} from '~/components/common/common';
import { statusToColor } from '~/components/interviews/common/maps/status-to-color.map';
import { IdCell } from '~/components/interviews/interviews-table/components/components';
import { getFormattedDate } from '~/helpers/helpers';
import { useAppDispatch, useAppNavigate } from '~/hooks/hooks';
import { interviewActions } from '~/store/actions';

import { getOtherInterviewsColumns } from './helpers/helpers';
import { styles } from './styles';

type Props = {
  interviews: InterviewsGetOtherItemResponseDto[];
  page: number;
  onPageChange: (page: number) => void;
  totalOtherInterviewsNumber: number;
};

const OtherApplications: FC<Props> = ({
  interviews,
  page,
  onPageChange,
  totalOtherInterviewsNumber,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();

  const hasInterviews = Boolean(interviews.length);

  const handleInterviewSelect = (
    id: InterviewsUpdateRequestParamsDto,
  ): void => {
    dispatch(interviewActions.getInterview(id));
    navigation.navigate(InterviewScreenName.INTERVIEW);
  };

  const otherInterviewsColumns = getOtherInterviewsColumns();
  const otherInterviewsRows = interviews.map((interview) => {
    return {
      id: <IdCell id={interview.id} onPress={handleInterviewSelect} />,
      name: interview.interviewee.userDetails.fullName,
      category: (
        <Category
          keyName={interview.courseCategory.key ?? 'unknown'}
          name={interview.courseCategory.name ?? 'Unknown'}
        />
      ),
      status: (
        <Chip text={interview.status} color={statusToColor[interview.status]} />
      ),
      interviewer:
        interview.interviewer?.userDetails?.fullName ?? 'Not assigned yet',
      date: interview.interviewDate
        ? getFormattedDate(interview.interviewDate, 'HH:mm dd.MM.yyyy')
        : 'Not assigned yet',
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Other Applications</Text>
      {!hasInterviews ? (
        <Text style={styles.noApplications}>No more applications yet</Text>
      ) : (
        <>
          <Table
            columnWidthArr={[50, 180, 180, 150, 180, 155]}
            columns={otherInterviewsColumns}
            data={otherInterviewsRows}
          />
          <Pagination
            totalCount={totalOtherInterviewsNumber}
            pageSize={PaginationDefaultValue.DEFAULT_COUNT}
            currentPage={page}
            onPageChange={onPageChange}
          />
        </>
      )}
    </View>
  );
};

export { OtherApplications };
