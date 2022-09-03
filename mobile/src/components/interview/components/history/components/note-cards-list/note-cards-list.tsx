import React, { FC } from 'react';

import { InterviewNoteGetAllItemResponseDto } from '~/common/types/types';
import { View } from '~/components/common/common';

import { NoteCard } from './components/components';
import { styles } from './styles';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const NoteCardsList: FC<Props> = ({ notes }) => {
  return (
    <View style={styles.container}>
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </View>
  );
};

export { NoteCardsList };
