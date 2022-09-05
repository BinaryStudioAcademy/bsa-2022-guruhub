import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { UserDetailsResponseDto } from '~/common/types/types';
import { Image, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  mentee: UserDetailsResponseDto;
};

const StudentCard: FC<Props> = ({ mentee }) => {
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
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
    </View>
  );
};

export { StudentCard };
