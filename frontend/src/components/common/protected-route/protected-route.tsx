import { AppRoute, PermissionKey } from 'common/enums/enums';
import { FC, UsersByIdResponseDto } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { checkPermissionKeys } from 'helpers/helpers';
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
  permissions,
}) => {
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  if (permissions) {
    const userPermissions =
      (
        user as UsersByIdResponseDto & {
          permissions: [];
        }
      ).permissions ?? [];

    if (
      !checkPermissionKeys({
        requiredPermissions: permissions,
        userPermissions,
      })
    ) {
      return <Navigate to={AppRoute.ROOT} />;
    }
  }

  return <>{component}</>;
};

export { ProtectedRoute };
