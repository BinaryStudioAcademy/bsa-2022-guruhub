import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { CourseModuleScreenName } from '~/common/enums/enums';
import { UserDetailsResponseDto } from '~/common/types/types';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  mentee: UserDetailsResponseDto;
};

const StudentCard: FC<Props> = ({ mentee }) => {
  const navigation = useAppNavigate();

  return (
    <Pressable
      style={styles.container}
      onPress={(): void => {
        navigation.navigate(CourseModuleScreenName.TASK, {
          menteeId: mentee.id,
          moduleId: 1,
        });
      }}
    >
      <View>
        <Image
          style={styles.avatar}
          source={{
            uri: mentee?.avatar?.url ?? getImageUri(defaultCourseImage),
          }}
        />
      </View>
      <View style={styles.fullNameContainer}>
        <Text style={styles.fullName}>{mentee.fullName}</Text>
      </View>
    </Pressable>
  );
};

export { StudentCard };
