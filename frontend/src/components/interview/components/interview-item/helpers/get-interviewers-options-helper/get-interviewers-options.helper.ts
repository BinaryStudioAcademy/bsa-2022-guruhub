import { SelectorOption } from 'common/types/types';
import { InterviewsGetInterviewerResponseDto } from 'guruhub-shared';

const getInterviewersOptions = (
  interviewers: InterviewsGetInterviewerResponseDto[],
): SelectorOption<number>[] => {
  return interviewers.map<SelectorOption<number>>((it) => ({
    label: it.interviewer.email,
    value: it.interviewer.id,
  }));
};

export { getInterviewersOptions };
