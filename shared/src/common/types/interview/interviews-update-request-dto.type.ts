import { InterviewStatus } from '~/common/enums/enums';

type InterviewsUpdateRequestDto = {
  interviewerUserId: number | null;
  status: InterviewStatus;
  interviewDate: string | null;
};

export { type InterviewsUpdateRequestDto };
