import { AppRoute } from 'common/enums/enums';
import { UserSignUpRequestDto, FC } from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useLocation,
  useNavigate,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm, SignInForm } from './components/components';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleSignInSubmit = (): void => {
    // handle sign in
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const hasUser = Boolean(user);

  if (hasUser) {
    navigate(AppRoute.ROOT);
  }

  const getScreen = (screen: string): React.ReactElement | null => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return <>{getScreen(pathname)}</>;
};

export { Auth };
