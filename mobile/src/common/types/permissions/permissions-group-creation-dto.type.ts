import { ReactElement } from 'react';

type PermissionsGroupCreationDto = {
  checkbox: JSX.Element | string | ReactElement;
  name: string;
  id: number;
};

export { type PermissionsGroupCreationDto };
