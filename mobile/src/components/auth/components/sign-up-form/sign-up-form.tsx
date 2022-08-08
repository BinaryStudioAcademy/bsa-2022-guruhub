import React, { FC } from 'react';

import { useAppForm } from '~/hooks/hooks';
import { RootScreenName } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { Text, View, Button, Input, Link } from '~/components/common/common';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';
import { Image } from 'react-native';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
};

const SignUpForm: FC<Props> = ({ onSubmit }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  return (
    <View style={styles.container}>
      <Image source={require('../../../../assets/images/logo.png')} />
      <Text style={styles.title}>Create an account</Text>
      <View>
        <View style={styles.inputWrapper}>
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            name="fullName"
            control={control}
            errors={errors}
          />
        </View>
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
          <Input
            label="Password"
            placeholder="Enter your password"
            name="password"
            control={control}
            errors={errors}
          />
        </View>
        <Button label="Sign up" onPress={handleSubmit(onSubmit)} />
        <Link label="Go to Sign In" to={{ screen: RootScreenName.SIGN_IN }} />
      </View>
    </View>
  );
};

export { SignUpForm };
