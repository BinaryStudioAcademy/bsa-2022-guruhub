import { InterviewStatus } from '~/common/enums/enums';

type InterviewsUpdateWithoutInterviewerRequestDto = {
  status: InterviewStatus;
  interviewDate: string | null;
};

export { type InterviewsUpdateWithoutInterviewerRequestDto };
