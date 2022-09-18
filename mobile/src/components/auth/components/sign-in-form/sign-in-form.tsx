import React, { FC } from 'react';

import { AppScreenName, RootScreenName } from '~/common/enums/enums';
import { UserSignInRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  InputSecure,
  Link,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { userSignIn as userSignInValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_SIGN_IN_PAYLOAD } from './common/constants';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
};

const SignInForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  return (
    <>
      <Text style={styles.title}>Sign in</Text>
      <Stack space={15}>
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
        <Button label="Sign in" onPress={handleSubmit(onSubmit)} />
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

export { SignInForm };
