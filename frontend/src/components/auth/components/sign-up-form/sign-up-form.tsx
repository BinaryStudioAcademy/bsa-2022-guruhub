import { FC, UserSignUpRequestDto } from 'common/types/types';
import { Button, Input, Link } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userSignUp as userSignUpValidationSchema } from 'validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common';
import styles from '../../Auth.module.scss';
import { AppRoute } from 'common/enums/enums';

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
      <div className={styles['form-wrapper']}>
        <div className={styles['form-header']}>
          <h2>Create an account</h2>
          <p>
            Already registered?{' '}
            <Link to={AppRoute.SIGN_IN}>
              <span>Log in</span>
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles['form-content']}>
            <p className={styles['form-input-wrapper']}>
              <Input
                type="text"
                label="Full Name"
                name={getNameOf<UserSignUpRequestDto>('fullName')}
                control={control}
                errors={errors}
              />
            </p>
            <p className={styles['form-input-wrapper']}>
              <Input
                type="text"
                label="Email"
                name={getNameOf<UserSignUpRequestDto>('email')}
                control={control}
                errors={errors}
              />
            </p>
            <p className={styles['form-input-wrapper']}>
              <Input
                type="password"
                label="Password"
                name={getNameOf<UserSignUpRequestDto>('password')}
                control={control}
                errors={errors}
              />
            </p>
          </div>
          <div className={styles['button-wrapper']}>
            <Button
              className={styles['form-button']}
              type="submit"
              label="Sign up"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export { SignUpForm };
