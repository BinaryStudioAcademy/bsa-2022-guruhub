import { ReactElement } from 'react';

type UsersTableData = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  action?: ReactElement;
};

export { type UsersTableData };
