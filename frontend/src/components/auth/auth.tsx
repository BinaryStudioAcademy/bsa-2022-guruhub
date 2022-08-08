import { AppRoute } from 'common/enums/enums';
import {
  UserSignUpRequestDto,
  FC,
  UserSignInRequestDto,
} from 'common/types/types';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useLocation,
  useNavigate,
} from 'hooks/hooks';
import { authActions } from 'store/actions';
import { SignUpForm, SignInForm } from './components/components';
import { getValidClasses } from 'helpers/helpers';
import styles from './styles.module.scss';
import authImage from 'assets/img/auth.png';
import logo from 'assets/img/logo.svg';

const Auth: FC = () => {
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const hasUser = Boolean(user);

  useEffect(() => {
    if (hasUser) {
      navigate(AppRoute.ROOT);
    }
  }, [hasUser, navigate]);

  const handleSignInSubmit = (payload: UserSignInRequestDto): void => {
    dispatch(authActions.signIn(payload));
  };

  const handleSignUpSubmit = (payload: UserSignUpRequestDto): void => {
    dispatch(authActions.signUp(payload));
  };

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

  return (
    <>
      <div className={styles.main}>
        <div className={styles.background}>
          <div className={getValidClasses(styles.circle, styles.circleFirst)} />
          <div className={getValidClasses(styles.circle, styles.circleSecond)}>
            <img src={logo} className={styles.logo} />
            <img src={authImage} />
          </div>
          <div className={getValidClasses(styles.circle, styles.circleThird)} />
          <div
            className={getValidClasses(styles.circle, styles.circleFourth)}
          />
        </div>
        {getScreen(pathname)}
      </div>
    </>
  );
};

export { Auth };
