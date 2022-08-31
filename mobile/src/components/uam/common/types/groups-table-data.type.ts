import { ReactElement } from 'react';

type GroupsTableData = {
  id: number;
  name: string;
  key: string;
  createdAt: string;
  action?: ReactElement;
};

export { type GroupsTableData };
