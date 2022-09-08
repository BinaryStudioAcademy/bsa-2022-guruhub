import React, { FC, ReactElement } from 'react';

import { CourseModulesGetAllItemResponseDto } from '~/common/types/types';
import {
  FlatList,
  Pressable,
  Spinner,
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Content</Text>
      {isLoading ? (
        <Spinner />
      ) : (
        <FlatList
          data={courseModules}
          keyExtractor={({ id }): string => id.toString()}
          renderItem={({ item: module, index }): ReactElement => (
            <Pressable
              onPress={(): void => onModulePress(module.courseId, module.id)}
              disabled={!user}
            >
              <Module
                index={index}
                title={module.title}
                description={module.description}
              />
            </Pressable>
          )}
          ListEmptyComponent={(): ReactElement => (
            <Text style={styles.noModules}>No modules found</Text>
          )}
          ItemSeparatorComponent={(): ReactElement => (
            <View style={styles.separator}></View>
          )}
        />
      )}
    </View>
  );
};

export { CourseModules };
