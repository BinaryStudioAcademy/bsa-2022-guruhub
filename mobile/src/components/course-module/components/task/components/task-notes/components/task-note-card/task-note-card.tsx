import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { TaskNoteGetItemResponseDto } from '~/common/types/types';
import { Image, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { TaskStates } from './components/components';
import { styles } from './styles';

type Props = {
  note: TaskNoteGetItemResponseDto;
};

const TaskNoteCard: FC<Props> = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              note.author.userDetails.avatar?.url ?? getImageUri(defaultAvatar),
          }}
        />
        <Text style={styles.name}>{note.author.userDetails.fullName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.note}>{note.note}</Text>
        <View style={styles.footerContainer}>
          <Text style={styles.date}>
            {getFormattedDate(note.createdAt, 'HH:mm dd.MM.yyyy')}
          </Text>
          <TaskStates status={note.status} />
        </View>
      </View>
    </View>
  );
};

export { TaskNoteCard };
