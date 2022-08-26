import React from 'react';

import { AppColor, AppFontFamily } from '~/common/enums/enums';
import { InterviewsGetAllItemResponseDto } from '~/common/types/types';
import { Text } from '~/components/common/common';
import { InterviewsTableData } from '~/components/interviews/common/types/types';

const getTableRow = (
  interviews: InterviewsGetAllItemResponseDto[],
): InterviewsTableData[] => {
  return interviews.map((item: InterviewsGetAllItemResponseDto) => {
    return {
      id: item.id,
      name: item.interviewee.fullName,
      direction: item.courseCategory.name,
      status: (
        <Text
          style={{
            fontFamily: AppFontFamily.INTER_600,
            color: AppColor.TEXT.GRAY_100,

            marginHorizontal: 5,
            backgroundColor: AppColor.BRAND.BLUE_100,
            borderRadius: 16,
            textAlign: 'center',
          }}
        >
          {item.status}
        </Text>
      ),
      interviewer: item.interviewer.fullName,
      date: item.interviewDate,
    };
  });
};

export { getTableRow };
