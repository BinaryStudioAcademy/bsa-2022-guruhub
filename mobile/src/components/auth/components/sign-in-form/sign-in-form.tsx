import React, { FC } from 'react';

import { RootScreenName } from '~/common/enums/enums';
import { Button, Link, Text, View } from '~/components/common/common';

type Props = {
  onSubmit: () => void;
};

const SignInForm: FC<Props> = () => {
  return (
    <>
      <Text>Sign In</Text>
      <View>
        <Button
          label="Sign in"
          onPress={(): void => {
            // TODO: handle press
          }}
        />
        <Link label="Go to Sign Up" to={{ screen: RootScreenName.SIGN_UP }} />
      </View>
    </>
  );
};

export { SignInForm };
