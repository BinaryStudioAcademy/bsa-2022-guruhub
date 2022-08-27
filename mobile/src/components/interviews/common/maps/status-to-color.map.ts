import { InterviewStatus } from '~/common/enums/enums';
import { StatusColor } from '~/components/interviews/common/enums/enums';

const statusToColor: Record<string, string> = {
  [InterviewStatus.COMPLETED]: StatusColor.COMPLETED,
  [InterviewStatus.IN_PROGRESS]: StatusColor.IN_PROGRESS,
  [InterviewStatus.PENDING]: StatusColor.PENDING,
  [InterviewStatus.REJECTED]: StatusColor.REJECTED,
};

export { statusToColor };
