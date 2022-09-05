import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { CourseModulesGetAllItemResponseDto } from '~/common/types/types';
import {
  Pressable,
  Spinner,
  Stack,
  Text,
  View,
} from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { Module } from './components/module/module';
import { styles } from './styles';

type Props = {
  courseModules: CourseModulesGetAllItemResponseDto[];
  isLoading: boolean;
};

const CourseModules: FC<Props> = ({ courseModules, isLoading }) => {
  const navigation = useAppNavigate();

  if (!courseModules.length) {
    return <></>;
  }

  const handleModulePress = (): void => {
    navigation.navigate(AppScreenName.COURSE_MODULE);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Content</Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <Stack space={15}>
          {courseModules.map((module, index) => (
            <Pressable onPress={(): void => handleModulePress()}>
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
