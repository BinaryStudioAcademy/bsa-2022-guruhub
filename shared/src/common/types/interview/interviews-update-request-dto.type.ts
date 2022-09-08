import { InterviewStatus } from '~/common/enums/enums';

type InterviewsUpdateRequestDto = {
  interviewerUserId: number;
  status: InterviewStatus;
};

export { type InterviewsUpdateRequestDto };
