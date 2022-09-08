import React, { FC } from 'react';

import { UserSignUpRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  InputSecure,
  Pressable,
  Text,
  View,
} from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { userSignUp as userSignUpValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_SIGN_UP_PAYLOAD } from './common/constants';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: UserSignUpRequestDto) => void;
  onSkipSignUp: () => void;
};

const SignUpForm: FC<Props> = ({ onSubmit, onSkipSignUp }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignUpRequestDto>({
    defaultValues: DEFAULT_SIGN_UP_PAYLOAD,
    validationSchema: userSignUpValidationSchema,
  });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

  return (
    <>
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
          <InputSecure
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
        <Pressable
          style={styles.skipWrapper}
          hitSlop={hitSlop}
          onPress={onSkipSignUp}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </>
  );
};

export { SignUpForm };
