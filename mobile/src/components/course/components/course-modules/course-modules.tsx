import React, { FC } from 'react';

import { CourseModulesGetAllItemResponseDto } from '~/common/types/types';
import {
  Pressable,
  Spinner,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { useAppSelector } from '~/hooks/hooks';

import { Module } from './components/module/module';
import { styles } from './styles';

type Props = {
  courseModules: CourseModulesGetAllItemResponseDto[];
  isLoading: boolean;
  onModulePress: (courseId: number, moduleId: number) => void;
};

const CourseModules: FC<Props> = ({
  courseModules,
  isLoading,
  onModulePress,
}) => {
  const user = useAppSelector((state) => state.auth.user);

  if (!courseModules.length) {
    return <></>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Content</Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack space={15}>
          {courseModules.map((module, index) => (
            <Pressable
              onPress={(): void => onModulePress(module.courseId, module.id)}
              disabled={!user}
            >
              <Module
                key={module.id}
                index={index}
                title={module.title}
                description={module.description}
              />
            </Pressable>
          ))}
        </Stack>
      )}
    </View>
  );
};

export { CourseModules };
