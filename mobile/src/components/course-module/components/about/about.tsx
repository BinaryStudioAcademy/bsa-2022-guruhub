import React, { FC } from 'react';

import { DataStatus } from '~/common/enums/enums';
import {
  Content,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { useAppSelector, useWindowDimensions } from '~/hooks/hooks';

import { styles } from './styles';

const About: FC = () => {
  const { courseTitle, moduleTitle, moduleDescription, dataStatus } =
    useAppSelector(({ courseModules }) => ({
      courseTitle: courseModules.module?.courseTitle ?? 'Untitled',
      moduleTitle: courseModules.module?.title ?? 'Untitled',
      moduleDescription: courseModules.module?.description ?? 'No description',
      dataStatus: courseModules.dataModuleStatus,
    }));

  const { width } = useWindowDimensions();

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView style={styles.wrapper}>
      <Text style={styles.courseTitle}>{courseTitle}</Text>
      <View style={styles.container}>
        <Text style={styles.moduleTitle}>{moduleTitle}</Text>
        <Content
          html={moduleDescription}
          width={width}
          style={styles.description}
        />
      </View>
    </ScrollView>
  );
};

export { About };
