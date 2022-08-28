import { AppRoute, PermissionKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { AuthorizedWrapper, ProtectedRoute } from 'components/common/common';
import { ReactNode } from 'react';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
  permissions?: PermissionKey[];
};

const AuthorizedProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
  permissions = [],
}) => {
  return (
    <AuthorizedWrapper>
      <ProtectedRoute
        permissions={permissions}
        component={component}
        redirectTo={redirectTo}
      />
    </AuthorizedWrapper>
  );
};

export { AuthorizedProtectedRoute };
