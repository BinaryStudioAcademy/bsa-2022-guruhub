import { Link as UILink } from '@react-navigation/native';
import React, { ComponentProps, FC } from 'react';

import { styles } from './styles';

type Props = {
  label: string;
  to: ComponentProps<typeof UILink>['to'];
};

const Link: FC<Props> = ({ label, to }) => {
  return (
    <UILink to={to} style={styles.container}>
      {label}
    </UILink>
  );
};

export { Link };
