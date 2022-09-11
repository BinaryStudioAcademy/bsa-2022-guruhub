import React, { FC } from 'react';

import defaultUserAvatar from '~/assets/images/avatar-default.png';
import {
  AuthScreenName,
  ButtonVariant,
  DataStatus,
  RootScreenName,
  UserAge,
  UserGender,
} from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';
import {
  Button,
  DatePicker,
  Dropdown,
  Image,
  Input,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri, subtractYears } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { authActions, userDetailsActions } from '~/store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_UPDATE_USER_DETAILS_PAYLOAD } from './common/constants';
import { styles } from './styles';

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { userDetails, dataStatus } = useAppSelector(({ userDetails }) => ({
    userDetails: userDetails.userDetails,
    dataStatus: userDetails.dataStatus,
  }));

  const GENDER_OPTIONS = Object.values(UserGender).map((gender) => ({
    label: gender,
    value: gender,
  }));
  const maxDate = subtractYears(new Date(), UserAge.MIN);
  const minDate = subtractYears(new Date(), UserAge.MAX);

  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  const handleCancel = (): void => reset();

  const handleUpdateProfile = (
    payload: UserDetailsUpdateInfoRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetails(payload));
  };

  const handleLogout = async (): Promise<void> => {
    await dispatch(authActions.signOut());
    navigation.navigate(RootScreenName.AUTH, {
      screen: AuthScreenName.SIGN_IN,
    });
  };

  useEffect(() => {
    dispatch(userDetailsActions.getUserDetails());
  }, []);

  useEffect(() => {
    if (userDetails) {
      reset({
        fullName: userDetails.fullName,
        gender: userDetails.gender ?? UserGender.MALE,
        dateOfBirth: userDetails.dateOfBirth ?? null,
      });
    }
  }, [userDetails]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.avatarSection}>
            <Image
              style={styles.avatar}
              source={{
                uri: userDetails?.avatar?.url ?? getImageUri(defaultUserAvatar),
              }}
            />
          </View>
          <Stack space={20}>
            <Input
              label="Name"
              name="fullName"
              control={control}
              errors={errors}
              placeholder="Enter your full name"
            />
            <Dropdown
              name="gender"
              label="Gender"
              items={GENDER_OPTIONS}
              control={control}
              errors={errors}
              placeholder="Select gender"
            />
            <DatePicker
              label="Date of birth"
              name="dateOfBirth"
              control={control}
              errors={errors}
              maximumDate={maxDate}
              minimumDate={minDate}
              placeholder="Select date"
            />
          </Stack>
          <View style={styles.buttons}>
            <Stack space={20} isHorizontal>
              <View style={styles.button}>
                <Button
                  label="Cancel"
                  variant={ButtonVariant.CANCEL}
                  onPress={handleCancel}
                  size="small"
                />
              </View>
              <View style={styles.button}>
                <Button
                  label="Save"
                  onPress={handleSubmit(handleUpdateProfile)}
                  size="small"
                />
              </View>
            </Stack>
          </View>
        </View>
        <View style={styles.singOutWrapper}>
          <Button label="Sign Out" onPress={handleLogout} />
        </View>
      </View>
    </ScrollView>
  );
};

export { Settings };
