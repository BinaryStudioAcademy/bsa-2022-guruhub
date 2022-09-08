import React, { FC } from 'react';

import { InterviewNoteGetAllItemResponseDto } from '~/common/types/types';
import { Text, View } from '~/components/common/common';

import { NoteCard } from './components/components';
import { styles } from './styles';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const NoteCardsList: FC<Props> = ({ notes }) => {
  const hasNotes = Boolean(notes.length);

  if (!hasNotes) {
    return <Text style={styles.noNotes}>No notes yet!</Text>;
  }

  return (
    <View style={styles.container}>
      {notes.map((note) => (
        <NoteCard note={note} key={note.id} />
      ))}
    </View>
  );
};

export { NoteCardsList };
