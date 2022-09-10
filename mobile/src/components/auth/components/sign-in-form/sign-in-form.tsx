import React, { FC } from 'react';

import { AppScreenName, RootScreenName } from '~/common/enums/enums';
import { UserSignInRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  InputSecure,
  Link,
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
      <View>
        <View style={styles.inputWrapper}>
          <Input
            label="Email"
            placeholder="Enter your email"
            name="email"
            control={control}
            errors={errors}
          />
        </View>
        <View style={styles.inputWrapper}>
          <InputSecure
            label="Password"
            placeholder="Enter your password"
            name="password"
            control={control}
            errors={errors}
          />
        </View>
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
      </View>
    </>
  );
};

export { SignInForm };
