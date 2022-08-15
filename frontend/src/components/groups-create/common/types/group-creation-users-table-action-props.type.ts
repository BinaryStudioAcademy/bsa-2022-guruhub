import {
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';

type GroupCreationUsersTableActionsProps = {
  id: number;
  name: FormControlPath;
  control: FormControl;
  register: FormControlRegister;
};

export { type GroupCreationUsersTableActionsProps };
