import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';
import { ReactNode } from 'react';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
};

const ProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
