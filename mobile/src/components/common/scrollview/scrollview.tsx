import React, { ComponentPropsWithoutRef, FC } from 'react';
import { ScrollView as UIScrollView } from 'react-native';

type Props = ComponentPropsWithoutRef<typeof UIScrollView>;

const ScrollView: FC<Props> = (props) => {
  return <UIScrollView keyboardShouldPersistTaps="handled" {...props} />;
};

export { ScrollView };
