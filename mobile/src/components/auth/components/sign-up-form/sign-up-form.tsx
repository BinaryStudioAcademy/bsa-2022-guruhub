import React, { FC } from 'react';

import { AppScreenName, RootScreenName } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  InputSecure,
  Link,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { useAppForm, useCallback, useFocusEffect } from '~/hooks/hooks';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, reset, errors, handleSubmit } =
    useAppForm<UserSignUpRequestDto>({
      defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
      validationSchema: userSignUpValidationSchema,
    });

  useFocusEffect(
    useCallback(() => {
      return () => {
        reset({
          fullName: '',
          email: '',
          password: '',
        });
      };
    }, []),
  );

  return (
    <>
      <Text style={styles.title}>Create an account</Text>
      <Stack space={15}>
        <Input
          label="Full Name"
          placeholder="Enter your full name"
          name="fullName"
          control={control}
          errors={errors}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          name="email"
          control={control}
          errors={errors}
        />
        <InputSecure
          label="Password"
          placeholder="Enter your password"
          name="password"
          control={control}
          errors={errors}
        />
      </Stack>
      <View style={styles.buttonWrapper}>
        <Button label="Sign up" onPress={handleSubmit(onSubmit)} />
      </View>
      <View style={styles.linkWrapper}>
        <Link
          label="Skip for now"
          to={{
            screen: RootScreenName.APP,
            params: { screen: AppScreenName.COURSES },
          }}
        />
      </View>
    </>
  );
};

export { SignUpForm };
