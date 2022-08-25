import { ReactElement } from 'react';

type InterviewsTableData = {
  id: number;
  name: string;
  direction: string;
  status: ReactElement;
  interviewer: string;
  date: string;
};

export { type InterviewsTableData };
