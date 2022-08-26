import {
  AppRoute,
  DataStatus,
  PermissionKey,
  StorageKey,
} from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Auth } from 'components/auth/auth';
import {
  AuthorizedWrapper,
  ProtectedRoute,
  Route,
  Routes,
  Spinner,
} from 'components/common/common';
import { Course } from 'components/course/course';
import { CourseModule } from 'components/course-module/course-module';
import { Dashboard } from 'components/dashboard/dashboard';
import { Interview } from 'components/interview/interview';
import { NotFound } from 'components/not-found/not-found';
import { UAM } from 'components/uam/uam';
import { UAMConfigureGroup } from 'components/uam-configure-group/uam-configure-group';
import { UserDetails } from 'components/user-details/user-details';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { storage } from 'services/services';
import { authActions } from 'store/actions';

const App: FC = () => {
  const { user, dataStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const hasUser = Boolean(user);
  const hasToken = Boolean(storage.getItem(StorageKey.TOKEN));

  useEffect(() => {
    if (hasToken) {
      dispatch(authActions.getCurrentUser());
    }
  }, [dispatch, hasToken]);

  if (!hasUser && hasToken && dataStatus !== DataStatus.REJECTED) {
    return <Spinner />;
  }

  return (
    <>
      <Routes>
        <Route
          path={AppRoute.ROOT}
          element={
            <AuthorizedWrapper>
              <Dashboard />
            </AuthorizedWrapper>
          }
        />
        <Route path={AppRoute.SIGN_UP} element={<Auth />} />
        <Route path={AppRoute.SIGN_IN} element={<Auth />} />
        <Route
          path={AppRoute.UAM}
          element={
            <AuthorizedWrapper>
              <ProtectedRoute
                permissions={[PermissionKey.MANAGE_UAM]}
                component={<UAM />}
              />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.UAM_CONFIGURE_GROUP}
          element={
            <AuthorizedWrapper>
              <UAMConfigureGroup />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.UAM_CONFIGURE_GROUP_$ID}
          element={
            <AuthorizedWrapper>
              <UAMConfigureGroup />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.COURSES_$ID}
          element={
            <AuthorizedWrapper>
              <Course />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.PROFILE}
          element={
            <AuthorizedWrapper>
              <ProtectedRoute component={<UserDetails />} />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.COURSES_$ID_MODULES_$ID}
          element={
            <AuthorizedWrapper>
              <CourseModule />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.INTERVIEWS_$ID}
          element={
            <AuthorizedWrapper>
              <ProtectedRoute
                permissions={[
                  PermissionKey.MANAGE_INTERVIEW,
                  PermissionKey.MANAGE_INTERVIEWS,
                ]}
                component={<Interview />}
              />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.ANY}
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
