import { AppRoute, DataStatus, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Navigate } from 'components/common/common';
import { useAppSelector } from 'hooks/hooks';
import { ReactNode } from 'react';
import { storage } from 'services/services';

type Props = {
  redirectTo?: AppRoute;
  component: ReactNode;
};

const ProtectedRoute: FC<Props> = ({
  redirectTo = AppRoute.SIGN_IN,
  component,
}) => {
  const { user, dataStatus } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);
  const token = Boolean(storage.getItem(StorageKey.TOKEN));

  if (
    !token ||
    (!hasUser &&
      (dataStatus === DataStatus.FULFILLED ||
        dataStatus === DataStatus.REJECTED))
  ) {
    return <Navigate to={redirectTo} />;
  }

  return <>{component}</>;
};

export { ProtectedRoute };
