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
import { useAppDispatch, useAppNavigate } from '~/hooks/hooks';
import { courseModulesActions } from '~/store/actions';

import { Module } from './components/module/module';
import { styles } from './styles';

type Props = {
  courseModules: CourseModulesGetAllItemResponseDto[];
  isLoading: boolean;
};

const CourseModules: FC<Props> = ({ courseModules, isLoading }) => {
  const navigation = useAppNavigate();
  const dispatch = useAppDispatch();

  if (!courseModules.length) {
    return <></>;
  }

  const handleModulePress = (courseId: number, moduleId: number): void => {
    dispatch(courseModulesActions.getModuleById({ courseId, moduleId }));
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
            <Pressable
              onPress={(): void =>
                handleModulePress(module.courseId, module.id)
              }
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
