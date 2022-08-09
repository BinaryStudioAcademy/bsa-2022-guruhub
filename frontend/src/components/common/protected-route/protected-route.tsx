import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
};

const ProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
