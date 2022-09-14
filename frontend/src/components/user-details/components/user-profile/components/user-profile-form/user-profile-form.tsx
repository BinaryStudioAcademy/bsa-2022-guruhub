import { UserAge, UserGender } from 'common/enums/enums';
import {
  FC,
  SelectorOption,
  UserDetailsResponseDto,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import { Button, Datepicker, Input, Select } from 'components/common/common';
import { getNameOf, subtractYears } from 'helpers/helpers';
import { useAppForm, useEffect, useMemo } from 'hooks/hooks';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import { getGenderOptions } from './helpers/helpers';
import styles from './styles.module.scss';

type Props = {
  userDetails: UserDetailsResponseDto | null;
  onGetUserDetails: () => void;
  onUpdateProfile: (payload: UserDetailsUpdateInfoRequestDto) => void;
};

const UserProfileForm: FC<Props> = ({
  userDetails,
  onGetUserDetails,
  onUpdateProfile,
}) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: {
        ...DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      },
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  useEffect(() => {
    if (userDetails) {
      reset({
        fullName: userDetails.fullName,
        gender: userDetails.gender ?? UserGender.MALE,
        dateOfBirth: userDetails.dateOfBirth ?? null,
        telegramUsername: userDetails.telegramUsername ?? '',
      });
    }
  }, [userDetails]);

  const genderOptions = useMemo<SelectorOption[]>(() => {
    return getGenderOptions();
  }, []);

  const maxDate = useMemo<Date>(() => {
    return subtractYears(new Date(), UserAge.MIN);
  }, []);

  const minDate = useMemo<Date>(() => {
    return subtractYears(new Date(), UserAge.MAX);
  }, []);

  return (
    <div>
      <form
        className={styles.formWrapper}
        onSubmit={handleSubmit(onUpdateProfile)}
      >
        <div className={styles.formContent}>
          <div className={styles.grid}>
            <Input
              type="text"
              label="Name"
              name={getNameOf<UserDetailsUpdateInfoRequestDto>('fullName')}
              control={control}
              errors={errors}
              placeholder="Enter your full name"
              inputClassName={styles.formInput}
            />
            <div className={styles.fieldWrapper}>
              <Datepicker
                control={control}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth')}
                label="Birth date"
                placeholder="Enter date of birth"
                maxDate={maxDate}
                minDate={minDate}
                className={styles.datePickerProfile}
              />
            </div>
          </div>
          <div className={styles.grid}>
            <Input
              type="text"
              label="Telegram Username"
              name={getNameOf<UserDetailsUpdateInfoRequestDto>(
                'telegramUsername',
              )}
              control={control}
              errors={errors}
              placeholder="Enter your telegram username"
              inputClassName={styles.formInput}
            />
            <div className={styles.fieldWrapper}>
              <Select
                label="Gender"
                options={genderOptions}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
                control={control}
                errors={errors}
                className={styles.formSelect}
              />
            </div>
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Button
            type="button"
            btnType="filled"
            btnColor="gray"
            label="Cancel"
            onClick={onGetUserDetails}
          />
          <Button
            onClick={handleSubmit(onUpdateProfile)}
            type="submit"
            label="Save"
            btnColor="blue"
          />
        </div>
      </form>
    </div>
  );
};

export { UserProfileForm };
