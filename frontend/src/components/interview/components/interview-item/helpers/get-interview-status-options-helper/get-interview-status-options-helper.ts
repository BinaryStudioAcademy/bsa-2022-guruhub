import { InterviewStatus } from 'common/enums/enums';
import { SelectorOption } from 'common/types/types';

const getInterviewStatusOptions = (): SelectorOption[] => {
  return Object.values(InterviewStatus).map<SelectorOption>((it) => ({
    label: it,
    value: it,
  }));
};

export { getInterviewStatusOptions };
