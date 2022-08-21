import { ReactElement } from 'react';

type UsersTableRow = {
  id: number;
  email: string;
  fullName: string;
  createdAt: string;
  checkbox: ReactElement;
};

export { type UsersTableRow };
