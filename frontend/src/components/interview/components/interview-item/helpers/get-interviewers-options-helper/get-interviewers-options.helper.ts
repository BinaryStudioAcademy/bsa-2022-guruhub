import { SelectorOption } from 'common/types/types';
import { InterviewsGetInterviewerResponseDto } from 'guruhub-shared';

const getInterviewersOptions = (
  interviewers: InterviewsGetInterviewerResponseDto[],
): SelectorOption<number>[] => {
  return interviewers.map<SelectorOption<number>>((it) => ({
    label: it.interviewer.userDetails.fullName,
    value: it.interviewer.id,
  }));
};

export { getInterviewersOptions };
