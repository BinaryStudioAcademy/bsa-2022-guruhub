import React, { FC, ReactElement } from 'react';

import defaultCourseImage from '~/assets/images/avatar-default.png';
import { ButtonVariant } from '~/common/enums/enums';
import { UsersGetResponseDto } from '~/common/types/types';
import { Button, Image, Text, View } from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  mentor: UsersGetResponseDto | null;
  handleMentorCardShown: () => void;
};

const MyMentorCard: FC<Props> = ({
  mentor,
  handleMentorCardShown,
}): ReactElement => {
  return (
    <View style={styles.container}>
      <View style={styles.dataWrapper}>
        <View style={styles.avatarContainer}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                mentor?.userDetails.avatar?.url ??
                getImageUri(defaultCourseImage),
            }}
          />
        </View>
        <View>
          <Text style={styles.fullName}>
            {mentor ? mentor.userDetails.fullName : ''}
          </Text>
          <Text style={styles.email}>{mentor ? mentor.email : ''}</Text>
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          label="Change a mentor"
          variant={ButtonVariant.CANCEL}
          onPress={handleMentorCardShown}
        />
      </View>
    </View>
  );
};

export { MyMentorCard };
