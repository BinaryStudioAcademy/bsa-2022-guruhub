import { DataStatus } from 'common/enums/enums';
import { FC, UserDetailsUpdateInfoRequestDto } from 'common/types/types';
import { Button, Input, Selector } from 'components/common/common';
import { getFormattedDate, getNameOf } from 'helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
} from 'hooks/hooks';
import { userDetailsActions } from 'store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from 'validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common';
import { SelectorData } from './selector.data';
import styles from './styles.module.scss';

const UserProfileForm: FC = () => {
  const dispatch = useAppDispatch();

  const { userDetails, dataStatus } = useAppSelector(
    (state) => state.userDetails,
  );

  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: userDetails
        ? {
            ...userDetails,
            dateOfBirth: getFormattedDate(
              userDetails.dateOfBirth,
              'yyyy-MM-dd',
            ),
          }
        : DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
  }, []);

  useEffect(() => {
    if (userDetails) {
      reset({
        fullName: userDetails.fullName,
        gender: userDetails.gender ?? '',
        dateOfBirth: getFormattedDate(userDetails.dateOfBirth, 'yyyy-MM-dd'),
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
              <Selector
                label="Gender"
                options={SelectorData}
                name={getNameOf<UserDetailsUpdateInfoRequestDto>('gender')}
                control={control}
                errors={errors}
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
            />
          </div>
          <div className={styles.buttonWrapper}>
            <Button
              type="button"
              btnType="outlined"
              btnColor="blue"
              label="Cancel"
              onClick={handleGetUsers}
              classes={styles.marginRight}
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
