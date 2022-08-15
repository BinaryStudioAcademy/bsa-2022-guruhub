import {
  FormControl,
  FormControlPath,
  FormControlRegister,
} from 'common/types/types';

type PermissionsTableActionsProps = {
  id: number;
  name: FormControlPath;
  register: FormControlRegister;
  control: FormControl;
};

export { type PermissionsTableActionsProps };
