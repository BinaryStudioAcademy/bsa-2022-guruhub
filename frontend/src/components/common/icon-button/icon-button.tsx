import { ButtonProps, FC } from 'common/types/types';

import { Button } from '../common';

type Props = Omit<ButtonProps, 'btnType'>;

const IconButton: FC<Props> = ({ iconName, ...props }) => {
  return <Button {...props} btnType="icon" iconName={iconName} />;
};

export { IconButton };
