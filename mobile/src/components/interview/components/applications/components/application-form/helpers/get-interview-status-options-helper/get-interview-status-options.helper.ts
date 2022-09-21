import { ItemType } from 'react-native-dropdown-picker';

import { InterviewStatus } from '~/common/enums/enums';

const getInterviewStatusOptions = (): ItemType<string>[] => {
  return Object.values(InterviewStatus).map((status) => ({
    label: status,
    value: status,
  }));
};

export { getInterviewStatusOptions };
