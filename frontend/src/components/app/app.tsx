import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { AuthorizedWrapper } from 'components/common/authorized-wrapper/authorized-wrapper';

const App: FC = () => {
  return (
    <AuthorizedWrapper>
      <Routes>
        <Route path={AppRoute.ROOT} element="Root" />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      </Routes>
    </AuthorizedWrapper>
  );
};

export { App };
