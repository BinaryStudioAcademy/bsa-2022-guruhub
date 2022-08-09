import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Auth } from 'components/auth/auth';
import {
  AuthorizedWrapper,
  NotFound,
  Route,
  Routes,
} from 'components/common/common';
import { UAM } from 'components/uam/uam';
import { useAppDispatch } from 'hooks/hooks';
import { useEffect } from 'react';
import { storage } from 'services/services';
import { authActions } from 'store/actions';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const token = Boolean(storage.getItem(StorageKey.TOKEN));

  useEffect(() => {
    if (token) {
      dispatch(authActions.getCurrentUser());
    }
  }, [dispatch, token]);

  return (
    <>
      <Routes>
        <Route
          path={AppRoute.ROOT}
          element={<AuthorizedWrapper>Root</AuthorizedWrapper>}
        />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route
          path={AppRoute.UAM}
          element={
            <AuthorizedWrapper>
              <UAM />
            </AuthorizedWrapper>
          }
        />
        <Route
          path="*"
          element={
            <AuthorizedWrapper>
              <NotFound />
            </AuthorizedWrapper>
          }
        />
      </Routes>
    </>
  );
};

export { App };
