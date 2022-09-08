import React, { FC } from 'react';

import { UserSignInRequestDto } from '~/common/types/types';
import {
  Button,
  Input,
  InputSecure,
  Pressable,
  Text,
  View,
} from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { userSignIn as userSignInValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_SIGN_IN_PAYLOAD } from './common/constants';
import { styles } from './styles';

type Props = {
  onSubmit: (payload: UserSignInRequestDto) => void;
  onSkipSignIn: () => void;
};

const SignInForm: FC<Props> = ({ onSubmit, onSkipSignIn }) => {
  const { control, errors, handleSubmit } = useAppForm<UserSignInRequestDto>({
    defaultValues: DEFAULT_SIGN_IN_PAYLOAD,
    validationSchema: userSignInValidationSchema,
  });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

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
        <Pressable
          style={styles.skipWrapper}
          hitSlop={hitSlop}
          onPress={onSkipSignIn}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </Pressable>
      </View>
    </>
  );
};

export { SignInForm };
