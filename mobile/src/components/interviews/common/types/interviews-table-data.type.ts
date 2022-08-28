import { ReactElement } from 'react';

type InterviewsTableData = {
  id: number;
  name: string;
  category: ReactElement;
  status: ReactElement;
  interviewer: string;
  date: string;
};

export { type InterviewsTableData };
