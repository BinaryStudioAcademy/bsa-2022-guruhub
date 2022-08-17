import {
  FC,
  FormEvent,
  UserDetailsCreateRequestDto,
  UserDetailsItemDto,
} from 'common/types/types';
import { Button, Input, Switcher } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userDetailsUpdate as userDetailsUpdateValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import styles from './styles.module.scss';

type Props = {
  userDetails: UserDetailsItemDto | null;
  onHandleUpdateProfile: (payload: UserDetailsCreateRequestDto) => void;
};

const UserProfileForm: FC<Props> = ({ userDetails, onHandleUpdateProfile }) => {
  const { control, errors, setValue, getValues } =
    useAppForm<UserDetailsCreateRequestDto>({
      defaultValues: userDetails
        ? userDetails
        : DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      validationSchema: userDetailsUpdateValidationSchema,
    });

  const setFormValue = (name: string, value: string): void => {
    setValue(name, value);
  };

  const date = getValues(getNameOf<UserDetailsCreateRequestDto>('dateOfBirth'))
    ? getValues(getNameOf<UserDetailsCreateRequestDto>('dateOfBirth')).split(
        'T',
      )[0]
    : '';

  const handleUpdateProfile = (e: FormEvent): void => {
    e.preventDefault();

    const res: UserDetailsCreateRequestDto = {
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
            name={getNameOf<UserDetailsCreateRequestDto>('firstName')}
            control={control}
            errors={errors}
            defaultValue={getValues(
              getNameOf<UserDetailsCreateRequestDto>('firstName'),
            )}
          />

          <Input
            type="text"
            label="Surname"
            name={getNameOf<UserDetailsCreateRequestDto>('lastName')}
            control={control}
            errors={errors}
            placeholder={userDetails?.lastName}
            defaultValue={getValues(
              getNameOf<UserDetailsCreateRequestDto>('lastName'),
            )}
          />
        </div>
      </div>
      <Switcher
        setGenderValue={setFormValue}
        name={getNameOf<UserDetailsCreateRequestDto>('gender')}
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
          name={getNameOf<UserDetailsCreateRequestDto>('dateOfBirth')}
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
