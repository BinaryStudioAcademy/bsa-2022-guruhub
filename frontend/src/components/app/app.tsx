import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, Header } from 'components/common/common';
import { Auth } from 'components/auth/auth';

const App: FC = () => {
  return (
    <>
      <Header />

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
