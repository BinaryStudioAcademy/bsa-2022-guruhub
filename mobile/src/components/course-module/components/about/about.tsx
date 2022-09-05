import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import { Spinner, Text, View } from '~/components/common/common';
import { useAppSelector } from '~/hooks/hooks';

import { styles } from './styles';

const About: FC = () => {
  const { courseTitle, dataStatus } = useAppSelector(({ courseModules }) => ({
    courseTitle: courseModules.module?.courseTitle ?? '',
    dataStatus: courseModules.dataModuleStatus,
  }));

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <View style={styles.wrapper}>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
    </View>
  );
};

export { About };
