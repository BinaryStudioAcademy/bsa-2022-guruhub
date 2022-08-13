import { AppRoute, PermissionKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';
import { useAppSelector } from 'hooks/hooks';
import { ReactNode } from 'react';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
  pagePermissions?: PermissionKey[];
};

const ProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  pagePermissions,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  if (pagePermissions) {
    const userPermissions = user?.permissions.map((item) => item.key) ?? [];

    if (
      !checkHasPermission({
        pagePermissions,
        userPermissions,
      })
    ) {
      return <Navigate to={AppRoute.ROOT} />;
    }
  }

  return <>{component}</>;
};

export { ProtectedRoute };
