import { InterviewStatus } from 'common/enums/enums';

type OtherApplicationsTableRow = {
  id: number;
  name: string;
  category: string;
  status: InterviewStatus;
  interviewer: string;
  date: string;
};

export { type OtherApplicationsTableRow };
