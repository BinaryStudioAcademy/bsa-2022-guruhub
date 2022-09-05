import React, { FC } from 'react';

import defaultAvatar from '~/assets/images/avatar-default.png';
import { InterviewNoteGetAllItemResponseDto } from '~/common/types/types';
import { Image, Text, View } from '~/components/common/common';
import { getFormattedDate, getImageUri } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  note: InterviewNoteGetAllItemResponseDto;
};

const NoteCard: FC<Props> = ({ note }) => {
  return (
    <View style={styles.container}>
      <View style={styles.user}>
        <Image
          style={styles.avatar}
          source={{
            uri:
              note.author.userDetails?.avatar?.url ??
              getImageUri(defaultAvatar),
          }}
        />
        <Text style={styles.name}>{note.author.userDetails.fullName}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.note}>{note.note}</Text>
        <Text style={styles.date}>
          {getFormattedDate(note.createdAt, 'HH:mm, dd.MM')}
        </Text>
      </View>
    </View>
  );
};

export { NoteCard };
