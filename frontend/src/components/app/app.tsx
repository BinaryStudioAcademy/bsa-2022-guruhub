import { AppRoute, StorageKey } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Routes, Route, AuthorizedWrapper } from 'components/common/common';
import { Auth } from 'components/auth/auth';
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
      </Routes>
    </>
  );
};

export { App };
