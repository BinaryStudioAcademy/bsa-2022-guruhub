import React, { FC } from 'react';
import { Image } from 'react-native';

import { RootScreenName } from '~/common/enums/enums';
import { UserSignUpRequestDto } from '~/common/types/types';
import { Button, Input, Link, Text, View } from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';
import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';
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
      <View style={styles.circle_1} />
      <View style={styles.circle_2} />
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
        <View style={styles.buttonWrapper}>
          <Button label="Sign up" onPress={handleSubmit(onSubmit)} />
        </View>
        <Link label="Go to Sign In" to={{ screen: RootScreenName.SIGN_IN }} />
      </View>
    </View>
  );
};

export { SignUpForm };
