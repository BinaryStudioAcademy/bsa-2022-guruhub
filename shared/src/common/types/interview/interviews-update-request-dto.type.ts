import { InterviewStatus } from '~/common/enums/enums';

type InterviewsUpdateRequestDto = {
  interviewerUserId: number;
  status: InterviewStatus;
  interviewDate: string | null;
};

export { type InterviewsUpdateRequestDto };
