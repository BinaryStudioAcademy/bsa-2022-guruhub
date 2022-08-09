import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import {
  Routes,
  Route,
  AuthorizedWrapper,
  AuthedMenu,
} from 'components/common/common';
import { Auth } from 'components/auth/auth';

const App: FC = () => {
  return (
    <>
      <Routes>
        <Route
          path={AppRoute.ROOT}
          element={
            <AuthorizedWrapper>
              <AuthedMenu />
            </AuthorizedWrapper>
          }
        />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
      </Routes>
    </>
  );
};

export { App };
