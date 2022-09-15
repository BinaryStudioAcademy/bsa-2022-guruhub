import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { CourseScreenName } from '~/common/enums/enums';
import { UserDetailsResponseDto } from '~/common/types/types';
import { Image, Pressable, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import { useAppNavigate } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  mentee: UserDetailsResponseDto;
  onSelect: (menteeId: number) => void;
};

const StudentCard: FC<Props> = ({ mentee, onSelect }) => {
  const navigation = useAppNavigate();

  const handleSelect = (): void => {
    onSelect(mentee.id);
    navigation.navigate(CourseScreenName.ABOUT);
  };

  return (
    <Pressable style={styles.container} onPress={handleSelect}>
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
