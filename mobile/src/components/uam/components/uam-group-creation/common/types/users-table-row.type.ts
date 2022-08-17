import { ReactElement } from 'react';

type UsersTableRow = {
  id: number;
  email: string;
  fullName: string;
  checkbox: JSX.Element | string | ReactElement;
};

export { type UsersTableRow };
