import { AppRoute } from 'common/enums/enums';
import { IconName } from 'common/types/types';

type ButtonProps = {
  label?: string;
  btnColor?: 'blue' | 'gray';
  type?: 'button' | 'submit';
  btnType?: 'filled' | 'outlined' | 'icon';
  to?: AppRoute | string;
  onClick?: () => void;
  iconName?: IconName;
};

export { ButtonProps };
