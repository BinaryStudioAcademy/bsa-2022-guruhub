import { ItemType } from 'react-native-dropdown-picker';

import { InterviewsGetInterviewerResponseDto } from '~/common/types/types';

const getInterviewersOptions = (
  interviewers: InterviewsGetInterviewerResponseDto[],
): ItemType<string | number>[] => {
  return interviewers.map((interviewer) => ({
    label: interviewer.interviewer.userDetails.fullName,
    value: interviewer.interviewer.id,
  }));
};

export { getInterviewersOptions };
