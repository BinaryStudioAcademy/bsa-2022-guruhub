import { InterviewStatus } from '../enums/enums';

type InterviewsTableRow = {
  id: number;
  name: string;
  category: string;
  status: InterviewStatus;
  interviewer: string;
  date: string;
};

export { type InterviewsTableRow };
