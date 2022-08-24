import { InterviewStatus } from '~/common/enums/enums';

type InterviewsResponseDto = {
  id: number;
  status: InterviewStatus;
  categoryId: number;
  intervieweeUserId: number;
};

export { type InterviewsResponseDto };
