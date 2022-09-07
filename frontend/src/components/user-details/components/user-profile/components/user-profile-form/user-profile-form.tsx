import { DataStatus, UserGender } from 'common/enums/enums';
import {
  FC,
  SelectorOption,
  UserDetailsUpdateInfoRequestDto,
} from 'common/types/types';
import { Button, Datepicker, Input, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useMemo,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import { getGenderOptions } from './helpers/helpers';
import styles from './styles.module.scss';

const UserProfileForm: FC = () => {
  const dispatch = useAppDispatch();

  const { userDetails, dataStatus } = useAppSelector(
    (state) => state.userDetails,
  );

  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: {
        ...DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      },
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
  }, []);

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

  const handleUpdateProfile = (
    payload: UserDetailsUpdateInfoRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetails(payload));
  };

  const handleGetUsers = (): void => {
    dispatch(userDetailsActions.getUserDetails());
  };

  const genderOptions = useMemo<SelectorOption[]>(() => {
    return getGenderOptions();
  }, []);

  return (
    <div>
      {dataStatus !== DataStatus.PENDING && (
        <form
          className={styles.formWrapper}
          onSubmit={handleSubmit(handleUpdateProfile)}
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
              <Datepicker
                control={control}
                errors={errors}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('dateOfBirth')}
                label="Birth date"
              />
            </div>
            <div className={styles.grid}>
              <Select
                label="Gender"
                options={genderOptions}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
                control={control}
                errors={errors}
                className={styles.formSelect}
              />
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
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              type="button"
              btnType="filled"
              btnColor="gray"
              label="Cancel"
              onClick={handleGetUsers}
              className={styles.cancelBtn}
            />
            <Button
              onClick={handleSubmit(handleUpdateProfile)}
              type="submit"
              label="Save"
              btnColor="blue"
              className={styles.saveBtn}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export { UserProfileForm };
