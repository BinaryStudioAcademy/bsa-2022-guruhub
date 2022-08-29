import React from 'react';

import { InterviewStatus } from '~/common/enums/enums';
import { InterviewsGetAllItemResponseDto } from '~/common/types/types';
import { statusToColor } from '~/components/interviews/common/maps/maps';
import { InterviewsTableData } from '~/components/interviews/common/types/types';
import {
  CategoryCell,
  StatusCell,
} from '~/components/interviews/interviews-table/components/components';

const getInterviewsRows = (
  interviews: InterviewsGetAllItemResponseDto[],
): InterviewsTableData[] => {
  return interviews.map((item: InterviewsGetAllItemResponseDto) => {
    return {
      id: item.id,
      name: item.interviewee.email,
      category: <CategoryCell category={item.courseCategory} />,
      status: (
        <StatusCell
          text={item.status}
          color={statusToColor[item.status as InterviewStatus]}
        />
      ),
      interviewer: item.interviewer.email,
      date: item.interviewDate,
    };
  });
};

export { getInterviewsRows };
