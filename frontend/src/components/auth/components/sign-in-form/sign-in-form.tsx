import { FC, UserSignInRequestDto } from 'common/types/types';
import { AppRoute } from 'common/enums/enums';
import { useAppForm } from 'hooks/hooks';
import { getNameOf } from 'helpers/helpers';
import { userSignIn as userSignInValidationSchema } from 'validation-schemas/validation-schemas';
import { Button, Input, Link } from 'components/common/common';
import { DEFAULT_SIGN_IN_PAYLOAD } from './common';

import styles from './styles.module.scss';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  return (
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
          <Input
            type="text"
            label="Email"
            name={getNameOf<UserSignInRequestDto>('email')}
            control={control}
            errors={errors}
          />
          <Input
            type="password"
            label="Password"
            name={getNameOf<UserSignInRequestDto>('password')}
            control={control}
            errors={errors}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <Button type="submit" label="Sign In" />
        </div>
      </form>
    </div>
  );
};
export { SignInForm };
