import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, AuthorizedWrapper } from 'components/common/common';
import { Auth } from 'components/auth/auth';
import { UAM } from 'components/uam/uam';

const App: FC = () => {
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
      </Routes>
    </>
  );
};

export { App };
