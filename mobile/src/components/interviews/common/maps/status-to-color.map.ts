import { InterviewStatus } from '~/common/enums/enums';

const statusToColor: Record<InterviewStatus, string> = {
  [InterviewStatus.COMPLETED]: '#09521c',
  [InterviewStatus.IN_PROGRESS]: '#186a85',
  [InterviewStatus.PENDING]: '#666c70',
  [InterviewStatus.REJECTED]: '#932020',
};

export { statusToColor };
