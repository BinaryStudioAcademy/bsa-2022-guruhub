import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';

type GroupCreationUsersTableActionsProps = {
  errors: FormControlErrors;
  name: FormControlPath;
  control: FormControl;
  onToggle: () => void;
};

export { type GroupCreationUsersTableActionsProps };
