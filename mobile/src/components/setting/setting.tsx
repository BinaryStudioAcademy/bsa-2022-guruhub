import React, { FC } from 'react';
import { Asset } from 'react-native-image-picker';

import defaultUserAvatar from '~/assets/images/avatar-default.png';
import {
  ButtonVariant,
  DataStatus,
  UserAge,
  UserGender,
} from '~/common/enums/enums';
import {
  UserDetailsUpdateInfoRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import {
  Button,
  DatePicker,
  Dropdown,
  Image,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri, pickImage, subtractYears } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
  useState,
} from '~/hooks/hooks';
import { authActions, userDetailsActions } from '~/store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from '~/validation-schemas/validation-schemas';

import {
  DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
  GENDER_OPTIONS,
} from './common/constants';
import { styles } from './styles';

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState<Asset | null>(null);

  const { user, userDataStatus, userDetails, userDetailsDataStatus } =
    useAppSelector(({ auth, userDetails }) => ({
      user: auth.user,
      userDataStatus: auth.dataStatus,
      userDetails: userDetails.userDetails,
      userDetailsDataStatus: userDetails.dataStatus,
    }));

  const maxDate = subtractYears(new Date(), UserAge.MIN);
  const minDate = subtractYears(new Date(), UserAge.MAX);

  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: DEFAULT_UPDATE_USER_DETAILS_PAYLOAD,
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  const handleChooseAvatar = async (): Promise<void> => {
    const image = await pickImage();

    if (!image) {
      return;
    }

    setSelectedImage(image);
  };

  const handleSaveAvatar = (): void => {
    if (selectedImage) {
      const { uri, type, fileName: name } = selectedImage;

      const formData = new FormData();
      // eslint-disable-next-line no-use-before-define
      formData.append('image', { uri, type, name });

      dispatch(
        userDetailsActions.updateUserAvatar({
          file: formData,
          userId: (user as UserWithPermissions).id,
        }),
      );

      setSelectedImage(null);
    }
  };

  const handleCancel = (): void => {
    reset();
    setSelectedImage(null);
  };

  const handleUpdateProfile = (
    payload: UserDetailsUpdateInfoRequestDto,
  ): void => {
    dispatch(userDetailsActions.updateUserDetails(payload));
  };

  const handleLogout = (): void => {
    dispatch(authActions.signOut());
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

  if (
    userDataStatus === DataStatus.PENDING ||
    userDetailsDataStatus === DataStatus.PENDING
  ) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.profileWrapper}>
          <Text style={styles.title}>Profile</Text>
          <View style={styles.avatarSection}>
            <Pressable onPress={handleChooseAvatar}>
              <Image
                style={styles.avatar}
                source={{
                  uri:
                    selectedImage?.uri ??
                    userDetails?.avatar?.url ??
                    getImageUri(defaultUserAvatar),
                }}
              />
            </Pressable>
            <Stack space={20}>
              <Button
                label="Update file"
                variant={ButtonVariant.SECONDARY}
                onPress={handleChooseAvatar}
                size="small"
              />
              <Button label="Save" onPress={handleSaveAvatar} size="small" />
            </Stack>
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
