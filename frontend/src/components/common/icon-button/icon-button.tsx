import { FC } from 'common/types/types';

import { Props as ButtonProps } from '../button/button';
import { Button } from '../common';

type Props = Omit<ButtonProps, 'btnType' | 'hasVisuallyHiddenLabel'>;

const IconButton: FC<Props> = ({ ...props }) => {
  return <Button {...props} btnType="icon" hasVisuallyHiddenLabel />;
};

export { IconButton };
