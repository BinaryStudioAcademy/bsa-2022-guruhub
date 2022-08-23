import {
  AppRoute,
  ExceptionMessage,
  NotificationType,
  PermissionKey,
} from 'common/enums/enums';
import { FC, UserWithPermissions } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { checkHasPermission } from 'helpers/helpers';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { ReactNode, useEffect } from 'react';
import { appActions } from 'store/actions';

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
  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasUser && !hasUserPermission) {
      dispatch(
        appActions.notify({
          type: NotificationType.ERROR,
          message: ExceptionMessage.PERMISSION_LACK,
        }),
      );
    }
  }, [dispatch, hasUser]);

  if (!hasUser) {
    return <Navigate to={redirectTo} />;
  }

  const hasUserPermission = checkHasPermission({
    permissionKeys: permissions,
    userPermissions: (user as UserWithPermissions).permissions,
  });

  if (!hasUserPermission) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
