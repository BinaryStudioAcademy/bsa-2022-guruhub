import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { getNameOf, getValidClasses } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';
import styles from 'components/auth/auth.module.scss';
import { AppRoute } from 'common/enums/enums';
import logo from 'assets/img/logo.svg';
import authImage from 'assets/img/auth.png';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

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
        <div className={styles.formWrapper}>
          <div className={styles.formHeader}>
            <h2>Create an account</h2>
            <p>
              Already registered?{' '}
              <Link to={AppRoute.SIGN_IN}>
                <span>Log in</span>
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formContent}>
              <p className={styles.formInputWrapper}>
                <Input
                  type="text"
                  label="Full Name"
                  name={getNameOf<UserSignUpRequestDto>('fullName')}
                  control={control}
                  errors={errors}
                />
              </p>
              <p className={styles.formInputWrapper}>
                <Input
                  type="text"
                  label="Email"
                  name={getNameOf<UserSignUpRequestDto>('email')}
                  control={control}
                  errors={errors}
                />
              </p>
              <p className={styles.formInputWrapper}>
                <Input
                  type="password"
                  label="Password"
                  name={getNameOf<UserSignUpRequestDto>('password')}
                  control={control}
                  errors={errors}
                />
              </p>
            </div>
            <div className={styles.buttonWrapper}>
              <Button
                type="submit"
                label="Sign up"
                isDisabled={Boolean(Object.keys(errors).length)}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export { SignUpForm };
