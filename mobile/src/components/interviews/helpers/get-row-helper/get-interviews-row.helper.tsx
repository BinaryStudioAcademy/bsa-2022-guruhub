import React from 'react';

import { InterviewsGetAllItemResponseDto } from '~/common/types/types';
import { InterviewsTableData } from '~/components/interviews/common/types/types';
import { Label } from '~/components/interviews/interviews-table/components/components';

const getTableRow = (
  interviews: InterviewsGetAllItemResponseDto[],
): InterviewsTableData[] => {
  return interviews.map((item: InterviewsGetAllItemResponseDto) => {
    return {
      id: item.id,
      name: item.interviewee.fullName,
      direction: <Label text={item.courseCategory.name} />,
      status: <Label text={item.status} />,
      interviewer: item.interviewer.fullName,
      date: item.interviewDate,
    };
  });
};

export { getTableRow };
