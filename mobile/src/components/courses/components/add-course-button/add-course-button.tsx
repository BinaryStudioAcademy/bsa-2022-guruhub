import React, { FC } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

import { AppScreenName } from '~/common/enums/enums';
import { Icon, Pressable, View } from '~/components/common/common';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

const AddCourseButton: FC = () => {
  const navigation = useAppNavigate();

  const handleAddCourseButton = (): void => {
    navigation.navigate(AppScreenName.ADD_COURSE);
  };

  return (
    <Pressable
      style={({ pressed }): StyleProp<ViewStyle> => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={handleAddCourseButton}
    >
      <View style={styles.iconContainer}>
        <Icon name="plus" />
      </View>
    </Pressable>
  );
};

export { AddCourseButton };
