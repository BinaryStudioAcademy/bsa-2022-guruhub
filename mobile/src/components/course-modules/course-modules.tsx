import React, { FC, ReactElement } from 'react';

import { Text, View } from '~/components/common/common';
import { useAppSelector } from '~/hooks/hooks';

import { Module } from './components/module';
import { styles } from './styles';

const CourseModules: FC = (): ReactElement => {
  const { courseModules } = useAppSelector((state) => state.courseModules);

  const renderModules = courseModules.map((module, index) => (
    <Module
      key={module.id}
      index={index}
      title={module.title}
      description={module.description}
    />
  ));

  return (
    <View>
      <Text style={styles.title}>Course Content</Text>
      <View>{renderModules}</View>
    </View>
  );
};

export { CourseModules };
