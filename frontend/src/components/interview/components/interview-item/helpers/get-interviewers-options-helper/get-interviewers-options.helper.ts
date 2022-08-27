import { SelectorOptions } from 'common/types/types';
import { InterviewsGetInterviewerResponseDto } from 'guruhub-shared';

const getInterviewersOptions = (
  interviewers: InterviewsGetInterviewerResponseDto[],
): SelectorOptions<number>[] => {
  return interviewers.map<SelectorOptions<number>>((it) => ({
    name: it.interviewer.email,
    value: it.interviewer.id,
  }));
};

export { getInterviewersOptions };
