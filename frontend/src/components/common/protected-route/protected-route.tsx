import { AppRoute, PermissionKey } from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';
import { useAppSelector } from 'hooks/hooks';
import { ReactNode } from 'react';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
  permissions?: PermissionKey[];
};

const ProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  permissions = [],
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);
  const hasUserPermission = checkHasPermission({
    permissionKeys: permissions,
    userPermissions: (user as UserWithPermissions).permissions,
  });

  if (!hasUser || !hasUserPermission) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
