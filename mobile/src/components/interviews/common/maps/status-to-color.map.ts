import { InterviewStatus } from '~/common/enums/enums';

const statusToColor: Record<InterviewStatus, string> = {
  [InterviewStatus.NEW]: '#ecbc02',
  [InterviewStatus.REJECTED]: '#7e19f7',
  [InterviewStatus.CANCELED]: '#f64848',
  [InterviewStatus.COMPLETED]: '#7bdf00',
  [InterviewStatus.PENDING]: '#03d7fc',
  [InterviewStatus.IN_PROGRESS]: '#d605e8',
};

export { statusToColor };
