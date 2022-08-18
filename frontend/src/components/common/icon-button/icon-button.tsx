import { ButtonProps, FC } from 'common/types/types';

import { Button } from '../common';

type Props = Omit<ButtonProps, 'btnType'>;

const IconButton: FC<Props> = (props) => {
  return <Button {...props} btnType="icon" iconName="settings" />;
};

export { IconButton };
