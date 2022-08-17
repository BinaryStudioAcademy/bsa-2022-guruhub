import { ReactElement } from 'react';

type UsersTableRow = {
  id: number;
  email: string;
  fullName: string;
  checkbox: ReactElement;
};

export { type UsersTableRow };
