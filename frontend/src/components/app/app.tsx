import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route } from 'components/common/common';
import { useAppDispatch, useEffect } from 'hooks/hooks';
import { storage } from 'services/services';
import { Auth } from 'components/auth/auth';
import logo from 'assets/img/logo.svg';
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
      <img src={logo} className="App-logo" width="30" alt="logo" />

      <Routes>
        <Route path={AppRoute.ROOT} element="Root" />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      </Routes>
    </>
  );
};

export { App };
