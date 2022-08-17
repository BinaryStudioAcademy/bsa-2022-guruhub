import { FormControlPath } from 'common/types/types';

type PermissionsTableActionsProps = {
  name: FormControlPath;
  onToggle: () => void;
  isChecked?: boolean;
};

export { type PermissionsTableActionsProps };
