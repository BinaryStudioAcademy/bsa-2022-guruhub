import React, { FC, ReactElement } from 'react';

import { Text, View } from '~/components/common/common';

import { styles } from './styles';

const CoursesManagementTitle: FC = () => {
  const line = 'Courses management';

  const getTitleRow = (text: string): ReactElement => {
    return <Text style={styles.title}>{text}</Text>;
  };

  return <View>{line.split(' ').map((text) => getTitleRow(text))}</View>;
};

export { CoursesManagementTitle };
