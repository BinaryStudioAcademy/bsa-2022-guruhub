import { InterviewStatus } from '~/common/enums/enums';

type InterviewsCreateRequestDto = {
  status: InterviewStatus;
  intervieweeUserId: number;
  categoryId: number;
};

export { type InterviewsCreateRequestDto };
