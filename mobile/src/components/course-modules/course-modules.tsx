import React, { FC, ReactElement } from 'react';

import { Stack, Text, View } from '~/components/common/common';
import { useAppSelector } from '~/hooks/hooks';

import { Module } from './components/module';
import { styles } from './styles';

const CourseModules: FC = (): ReactElement => {
  const { courseModules } = useAppSelector((state) => state.courseModules);

  if (!courseModules.length) {
    return <></>;
  }

  return (
    <View>
      <Text style={styles.title}>Course Content</Text>
      <Stack space={15}>
        {courseModules.map((module, index) => (
          <Module
            key={module.id}
            index={index}
            title={module.title}
            description={module.description}
          />
        ))}
      </Stack>
    </View>
  );
};

export { CourseModules };
