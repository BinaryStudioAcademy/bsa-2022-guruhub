import { DataStatus } from 'common/enums/enums';
import { FC, UserDetailsUpdateInfoRequestDto } from 'common/types/types';
import { Button, Input, Select } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import { SelectData } from './select.data';
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
        ...userDetails,
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
        gender: userDetails.gender,
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
              />
            </div>
            <div className={styles.grid}>
              <Select
                label="Gender"
                options={SelectData}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              type="button"
              btnType="outlined"
              btnColor="blue"
              label="Cancel"
              onClick={handleGetUsers}
              className={styles.marginRight}
            />
            <Button
              onClick={handleSubmit(handleUpdateProfile)}
              type="submit"
              label="Save"
              btnColor="blue"
            />
          </div>
        </form>
      )}
    </div>
  );
};

export { UserProfileForm };
