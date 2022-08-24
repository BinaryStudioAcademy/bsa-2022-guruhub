import { InterviewStatus } from '~/common/enums/enums';

type InterviewsCreateResponseDto = {
  id: number;
  status: InterviewStatus;
  categoryId: number;
  intervieweeUserId: number;
};

export { type InterviewsCreateResponseDto };
