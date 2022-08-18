import { FC } from 'common/types/types';

import { Props as ButtonProps } from '../button/button';
import { Button } from '../common';

type Props = Omit<ButtonProps, 'btnType'>;

const IconButton: FC<Props> = ({ iconName, ...props }) => {
  return (
    <Button
      {...props}
      btnType="icon"
      iconName={iconName}
      btnColor="transparent"
    />
  );
};

export { IconButton };
