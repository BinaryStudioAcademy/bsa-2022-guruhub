import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { UserDetailsResponseDto } from '~/common/types/types';
import { Button, Image, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  mentor: UserDetailsResponseDto;
  onChoose: (mentorId: number) => void;
  buttonLabel?: string;
};

const MentorCard: FC<Props> = ({
  mentor,
  onChoose,
  buttonLabel = 'Choose',
}) => {
  const handleChoose = (): void => {
    onChoose(mentor.id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{
            uri: mentor?.avatar?.url ?? getImageUri(defaultCourseImage),
          }}
        />
      </View>
      <View style={styles.fullNameContainer}>
        <View style={styles.circle} />
        <Text style={styles.fullName}>{mentor.fullName}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button label={buttonLabel} onPress={handleChoose} />
      </View>
    </View>
  );
};

export { MentorCard };
