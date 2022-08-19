import React, { FC, ReactNode } from 'react';
import { ScrollView } from 'react-native';

type Props = {
  children: ReactNode;
};

const CustomScrollView: FC<Props> = ({ children }) => {
  return (
    <ScrollView keyboardShouldPersistTaps="handled">{children}</ScrollView>
  );
};

export { CustomScrollView };
