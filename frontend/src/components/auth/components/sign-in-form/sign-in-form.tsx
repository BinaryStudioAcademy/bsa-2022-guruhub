import clsx from 'clsx';
import { FC, UserSignInRequestDto } from 'common/types/types';
import { AppRoute, DataStatus } from 'common/enums/enums';
import {
  useAppForm,
  useNavigate,
  useAppSelector,
  useEffect,
  useState,
  useMemo,
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

  const [hasErrors, setHasErrors] = useState(false);

  const handleErrorFlag = (): void => {
    Object.keys(errors).length ? setHasErrors(true) : setHasErrors(false);
  };

  useMemo(handleErrorFlag, [errors]);

  const { dataStatus } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataStatus === DataStatus.FULFILLED) {
      navigate(AppRoute.ROOT);
    }
  }, [dataStatus]);

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <div className={clsx(styles.circle, styles.circleFirst)} />
        <div className={clsx(styles.circle, styles.circleSecond)}>
          <img src={logo} className={styles.logo} />
          <img src={authImage} />
        </div>
        <div className={clsx(styles.circle, styles.circleThird)} />
        <div className={clsx(styles.circle, styles.circleFourth)} />
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
              disabled={hasErrors}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export { SignInForm };
