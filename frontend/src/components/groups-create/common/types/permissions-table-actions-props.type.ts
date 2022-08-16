import {
  FormControl,
  FormControlErrors,
  FormControlPath,
} from 'common/types/types';

type PermissionsTableActionsProps = {
  errors: FormControlErrors;
  name: FormControlPath;
  control: FormControl;
  onToggle: () => void;
};

export { type PermissionsTableActionsProps };
