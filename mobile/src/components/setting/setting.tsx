import React, { FC } from 'react';

import defaultUserAvatar from '~/assets/images/avatar-default.png';
import { ButtonVariant, DataStatus, UserGender } from '~/common/enums/enums';
import { UserDetailsUpdateInfoRequestDto } from '~/common/types/types';
import {
  Button,
  Image,
  Input,
  Spinner,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppForm,
  useAppSelector,
  useEffect,
} from '~/hooks/hooks';
import { authActions, userDetailsActions } from '~/store/actions';
import { userDetailsUpdateInfo as userDetailsUpdateInfoValidationSchema } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

const Settings: FC = () => {
  const dispatch = useAppDispatch();
  const { userDetails, dataStatus } = useAppSelector(
    (state) => state.userDetails,
  );

  const { control, errors, handleSubmit, reset } =
    useAppForm<UserDetailsUpdateInfoRequestDto>({
      defaultValues: {
        fullName: '',
        gender: UserGender.MALE,
      },
      validationSchema: userDetailsUpdateInfoValidationSchema,
    });

  const handleGetUsers = (): void => {
    dispatch(userDetailsActions.getUserDetails());
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
      });
    }
  }, [userDetails]);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.avatarSection}>
        <Image
          style={styles.avatar}
          source={{ uri: getImageUri(defaultUserAvatar) }}
        />
      </View>
      <Input
        label="Name"
        name="fullName"
        control={control}
        errors={errors}
        placeholder="Enter your full name"
      />
      <View style={styles.buttons}>
        <Stack space={20} isHorizontal>
          <Button
            label="Cancel"
            variant={ButtonVariant.SECONDARY}
            onPress={handleGetUsers}
          />
          <Button label="Save" onPress={handleSubmit(handleUpdateProfile)} />
        </Stack>
      </View>
      <Button label="Sign Out" onPress={handleLogout} />
    </View>
  );
};

export { Settings };
