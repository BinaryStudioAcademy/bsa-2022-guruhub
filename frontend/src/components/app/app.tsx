import {
  AppRoute,
  DataStatus,
  PermissionKey,
  StorageKey,
} from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Auth } from 'components/auth/auth';
import { Billing } from 'components/billing/billing';
import { Chats } from 'components/chats/chats';
import {
  AuthorizedProtectedRoute,
  AuthorizedWrapper,
  Route,
  Routes,
  Spinner,
} from 'components/common/common';
import { Course } from 'components/course/course';
import { CourseModule } from 'components/course-module/course-module';
import { CoursesManagement } from 'components/courses-management/courses-management';
import { Dashboard } from 'components/dashboard/dashboard';
import { Interview } from 'components/interview/interview';
import { Interviews } from 'components/interviews/interviews';
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
            <AuthorizedProtectedRoute
              permissions={[PermissionKey.MANAGE_UAM]}
              component={<UAM />}
            />
          }
        />
        <Route
          path={AppRoute.UAM_CONFIGURE_GROUP}
          element={
            <AuthorizedProtectedRoute
              permissions={[PermissionKey.MANAGE_UAM]}
              component={<UAMConfigureGroup />}
            />
          }
        />
        <Route
          path={AppRoute.UAM_CONFIGURE_GROUP_$ID}
          element={
            <AuthorizedProtectedRoute
              permissions={[PermissionKey.MANAGE_UAM]}
              component={<UAMConfigureGroup />}
            />
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
          element={<AuthorizedProtectedRoute component={<UserDetails />} />}
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
          path={AppRoute.INTERVIEW}
          element={
            <AuthorizedProtectedRoute
              permissions={[
                PermissionKey.MANAGE_INTERVIEW,
                PermissionKey.MANAGE_INTERVIEWS,
              ]}
              component={<Interviews />}
            />
          }
        />
        <Route
          path={AppRoute.INTERVIEWS_$ID}
          element={
            <AuthorizedProtectedRoute
              permissions={[
                PermissionKey.MANAGE_INTERVIEWS,
                PermissionKey.MANAGE_INTERVIEW,
              ]}
              component={<Interview />}
            />
          }
        />
        <Route
          path={AppRoute.STUDENTS_$ID_COURSES_$ID}
          element={
            <AuthorizedWrapper>
              <Course />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.STUDENTS_$ID_COURSES_$ID_MODULES_$ID}
          element={
            <AuthorizedWrapper>
              <CourseModule />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.BILLING}
          element={
            <AuthorizedWrapper>
              <Billing />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.CHATS}
          element={
            <AuthorizedWrapper>
              <Chats />
            </AuthorizedWrapper>
          }
        />
        <Route
          path={AppRoute.COURSES_MANAGEMENT}
          element={
            <AuthorizedProtectedRoute
              permissions={[PermissionKey.MANAGE_CATEGORIES]}
              component={<CoursesManagement />}
            />
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
