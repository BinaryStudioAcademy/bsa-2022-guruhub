import {
  FC,
  FormEvent,
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import { Button, Input, Selector } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import { SelectorData } from './selector.data';
import styles from './styles.module.scss';

type Props = {
  userDetails: UserDetailsResponseDto | null;
  onHandleUpdateProfile: (payload: UserDetailsUpdateInfoRequestDto) => void;
  onHandleGetUser: () => void;
};

const UserProfileForm: FC<Props> = ({
  userDetails,
  onHandleUpdateProfile,
  onHandleGetUser,
}) => {
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

  const handleUpdateProfile = (e: FormEvent): void => {
    e.preventDefault();

    const res: UserDetailsUpdateInfoRequestDto = {
      fullName: getValues('fullName'),
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
            name={getNameOf<UserDetailsUpdateInfoRequestDto>('fullName')}
            control={control}
            errors={errors}
            defaultValue={getValues(
              getNameOf<UserDetailsUpdateInfoRequestDto>('fullName'),
            )}
          />
        </div>
        <div className={styles.grid}>
          <Selector
            label="Gender"
            value={getValues(
              getNameOf<UserDetailsUpdateInfoRequestDto>('gender'),
            )}
            options={SelectorData}
            setValue={setFormValue}
            name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
          />
        </div>
      </div>
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
          defaultValue={getValues(
            getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth'),
          )}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          label="Cancel"
          onClick={onHandleGetUser}
          classes={styles.cancelBtn}
        />
        <Button type="submit" label="Save" />
      </div>
    </form>
  );
};

export { UserProfileForm };
