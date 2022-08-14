import { FC, ReactNode } from 'react';

import { AuthScreenName } from '~/common/enums/enums';
import { useAppNavigate } from '~/hooks/hooks';

type Props = {
  isAllowed: boolean;
  redirectPath?: string;
  component: ReactNode;
};

const ProtectedRoute: FC<Props> = ({
  isAllowed,
  redirectPath = AuthScreenName.SIGN_IN,
  component,
}) => {
  const navigator = useAppNavigate();

  if (!isAllowed) {
    navigator.navigate(redirectPath);
  }

  return <>{component}</>;
};

export { ProtectedRoute };
