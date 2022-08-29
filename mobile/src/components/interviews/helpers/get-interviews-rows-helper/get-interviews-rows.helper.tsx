import React from 'react';

import { InterviewsGetAllItemResponseDto } from '~/common/types/types';
import { statusToColor } from '~/components/interviews/common/maps/maps';
import { InterviewsTableData } from '~/components/interviews/common/types/types';
import {
  CategoryCell,
  StatusCell,
} from '~/components/interviews/interviews-table/components/components';
import { getFormattedDate } from '~/helpers/helpers';

const getInterviewsRows = (
  interviews: InterviewsGetAllItemResponseDto[],
): InterviewsTableData[] => {
  return interviews.map((item: InterviewsGetAllItemResponseDto) => {
    return {
      id: item.id,
      name: item.interviewee.userDetails.fullName,
      category: <CategoryCell category={item.courseCategory} />,
      status: (
        <StatusCell text={item.status} color={statusToColor[item.status]} />
      ),
      interviewer: item.interviewer?.userDetails.fullName || '',
      date: getFormattedDate(item.interviewDate, 'kk:mm, dd/MM/yyyy'),
    };
  });
};

export { getInterviewsRows };
