import {
  FC,
  FormEvent,
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import { Button, Input, Switcher } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import styles from './styles.module.scss';

type Props = {
  userDetails: UserDetailsResponseDto | null;
  onHandleUpdateProfile: (payload: UserDetailsUpdateInfoRequestDto) => void;
};

const UserProfileForm: FC<Props> = ({ userDetails, onHandleUpdateProfile }) => {
  const { control, errors, setValue, getValues } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: userDetails
        ? userDetails
        : DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  const setFormValue = (name: string, value: string): void => {
    setValue(name, value);
  };

  const date = getValues(
    getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth'),
  )
    ? getValues(
        getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth'),
      ).split('T')[0]
    : '';

  const handleUpdateProfile = (e: FormEvent): void => {
    e.preventDefault();

    const res: UserDetailsUpdateInfoRequestDto = {
      firstName: getValues('firstName'),
      lastName: getValues('lastName'),
      gender: getValues('gender'),
      dateOfBirth: getValues('dateOfBirth'),
    };
    onHandleUpdateProfile(res);
  };

  return (
    <form className={styles.formWrapper} onSubmit={handleUpdateProfile}>
      <div className={styles.formContent}>
        <div className={styles.grid}>
          <Input
            type="text"
            label="Name"
            name={getNameOf<UserDetailsUpdateInfoRequestDto>('firstName')}
            control={control}
            errors={errors}
            defaultValue={getValues(
              getNameOf<UserDetailsUpdateInfoRequestDto>('firstName'),
            )}
          />

          <Input
            type="text"
            label="Surname"
            name={getNameOf<UserDetailsUpdateInfoRequestDto>('lastName')}
            control={control}
            errors={errors}
            placeholder={userDetails?.lastName}
            defaultValue={getValues(
              getNameOf<UserDetailsUpdateInfoRequestDto>('lastName'),
            )}
          />
        </div>
      </div>
      <Switcher
        setGenderValue={setFormValue}
        name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
        selected={userDetails?.gender || 'male'}
      />
      <div className={styles.personalInfo}>
        <div className={styles.subtitle}>Personal information</div>
        <div className={styles.text}>
          This information will be displayed publicly so be careful what you
          share.
        </div>
      </div>
      <div className={styles.grid}>
        <Input
          type="date"
          label="Date of birth"
          name={getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth')}
          control={control}
          errors={errors}
          defaultValue={date}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button label="Cancel" classes={styles.cancelBtn} />
        <Button type="submit" label="Save" />
      </div>
    </form>
  );
};

export { UserProfileForm };
