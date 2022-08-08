import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, Link } from 'components/common/common';
import { useEffect, useLocation } from 'hooks/hooks';
import { storage } from 'services/services';
import { Auth } from 'components/auth/auth';
import logo from 'assets/img/logo.svg';

const App: FC = () => {
  const { pathname } = useLocation();

  const token = Boolean(storage.getItem(StorageKey.TOKEN));

  useEffect(() => {
    alert(token);
  });

  return (
    <>
      <img src={logo} className="App-logo" width="30" alt="logo" />

      <ul className="App-navigation-list">
        <li>
          <Link to={AppRoute.ROOT}>Root</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_IN}>Sign in</Link>
        </li>
        <li>
          <Link to={AppRoute.SIGN_UP}>Sign up</Link>
        </li>
      </ul>
      <p>Current path: {pathname}</p>

      <div>
        <Routes>
          <Route path={AppRoute.ROOT} element="Root" />
          <Route path={AppRoute.SIGN_UP} element={<Auth />} />
          <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        </Routes>
      </div>
    </>
  );
};

export { App };
