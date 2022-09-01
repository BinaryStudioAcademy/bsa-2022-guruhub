import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { UserDetailsResponseDto } from '~/common/types/types';
import { Button, Image, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  mentor: UserDetailsResponseDto;
  onPressChoose: (mentorId: number) => void;
};

const MentorCard: FC<Props> = ({ mentor, onPressChoose }) => {
  const handlePressChoose = (): void => {
    onPressChoose(mentor.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: mentor?.avatarUrl ?? getImageUri(defaultCourseImage),
          }}
        />
      </View>
      <View style={styles.fullNameContainer}>
        <View style={styles.circle} />
        <Text style={styles.fullName}>{mentor.fullName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button label="Choose" onPress={handlePressChoose} />
      </View>
    </View>
  );
};

export { MentorCard };