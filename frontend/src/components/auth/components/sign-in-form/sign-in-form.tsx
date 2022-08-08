import { FC, UserSignInRequestDto } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf, getValidClasses } from 'helpers/helpers';
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

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <div className={getValidClasses(styles.circle, styles.circleFirst)} />
        <div className={getValidClasses(styles.circle, styles.circleSecond)}>
          <img src={logo} className={styles.logo} />
          <img src={authImage} />
        </div>
        <div className={getValidClasses(styles.circle, styles.circleThird)} />
        <div className={getValidClasses(styles.circle, styles.circleFourth)} />
      </div>
      <div className={styles.formWrapper}>
        <div className={styles.formHeader}>
          <h2 className={styles.formTitle}>Sign In</h2>
          <p className={styles.formLink}>
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
              />
            </p>
            <p className={styles.formInputWrapper}>
              <Input
                type="password"
                label="Password"
                name={getNameOf<UserSignInRequestDto>('password')}
                control={control}
                errors={errors}
              />
            </p>
          </div>
          <div className={styles.buttonWrapper}>
            <Button type="submit" label="Sign In" />
          </div>
        </form>
      </div>
    </div>
  );
};
export { SignInForm };
