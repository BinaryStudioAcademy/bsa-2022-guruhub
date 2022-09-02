import React, { FC } from 'react';

import { CourseModulesGetAllItemResponseDto } from '~/common/types/types';
import { Spinner, Stack, Text, View } from '~/components/common/common';

import { Module } from './components/module/module';
import { styles } from './styles';

type Props = {
  courseModules: CourseModulesGetAllItemResponseDto[];
  isLoading: boolean;
};

const CourseModules: FC<Props> = ({ courseModules, isLoading }) => {
  if (!courseModules.length) {
    return <></>;
  }

  return (
    <View>
      <Text style={styles.title}>Course Content</Text>
      {isLoading ? (
        <Spinner />
      ) : (
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
      )}
    </View>
  );
};

export { CourseModules };
