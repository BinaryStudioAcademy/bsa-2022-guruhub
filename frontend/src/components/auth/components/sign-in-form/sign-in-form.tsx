import { FC, UserSignInRequestDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { useAppForm } from 'hooks/hooks';
import { DEFAULT_SIGN_IN_PAYLOAD } from './common';
import { userSignIn as userSignInValidationSchema } from 'validation-schemas/validation-schemas';
import styles from 'components/auth/Auth.module.scss';
import { AppRoute } from 'common/enums/enums';
import { getNameOf } from 'guruhub-shared';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });
  return (
    <>
      <div className={styles['form-wrapper']}>
        <div className={styles['form-header']}>
          <h2>Sign In</h2>
          <p>
            Not registered yet?{' '}
            <Link to={AppRoute.SIGN_UP}>
              <span>Sign Up</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-content']}>
            <p className={styles['form-input-wrapper']}>
              <Input
                type="text"
                label="Email"
                name={getNameOf<UserSignInRequestDto>('email')}
                control={control}
                errors={errors}
              />
            </p>
            <p className={styles['form-input-wrapper']}>
              <Input
                type="password"
                label="Password"
                name={getNameOf<UserSignInRequestDto>('password')}
                control={control}
                errors={errors}
              />
            </p>
          </div>
          <div className={styles['button-wrapper']}>
            <Button
              className={styles['form-button']}
              type="submit"
              label="Sign In"
            />
          </div>
        </form>
      </div>
    </>
  );
};
export { SignInForm };
