import { FC, UserSignInRequestDto } from 'common/types/types';
import { AppRoute, DataStatus } from 'common/enums/enums';
import {
  useAppForm,
  useNavigate,
  useAppSelector,
  useEffect,
} from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { userSignIn as userSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_SIGN_IN_PAYLOAD } from './common';
import authImage from 'assets/img/auth.png';
import logo from 'assets/img/logo.svg';
import styles from 'components/auth/auth.module.scss';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const { dataStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataStatus === DataStatus.FULFILLED) {
      navigate(AppRoute.ROOT);
    }
  }, [dataStatus]);

  return (
    <div>
      <div className={styles.background}>
        <div className={`${styles.circle} ${styles.circleFirst}`} />
        <div className={`${styles.circle} ${styles.circleSecond}`}>
          <img src={logo} className={styles.logo} />
          <img src={authImage} />
        </div>
        <div className={`${styles.circle} ${styles.circleThird}`} />
        <div className={`${styles.circle} ${styles.circleFourth}`} />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2>Sign In</h2>
          <p>
            Not registered yet?{' '}
            <Link to={AppRoute.SIGN_UP}>
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formContent}>
            <p className={styles.formInputWrapper}>
              <Input
                type="text"
                label="Email"
                name={getNameOf<UserSignInRequestDto>('email')}
                control={control}
                errors={errors}
                className={errors.email && styles.error}
              />
            </p>
            <p className={styles.formInputWrapper}>
              <Input
                type="password"
                label="Password"
                name={getNameOf<UserSignInRequestDto>('password')}
                control={control}
                errors={errors}
                className={errors.password && styles.error}
              />
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.formButton}
              type="submit"
              label="Sign In"
              disabled={Object.keys(errors).length > 0}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export { SignInForm };
