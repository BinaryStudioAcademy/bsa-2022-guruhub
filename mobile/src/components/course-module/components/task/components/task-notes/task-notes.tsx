import React, { FC } from 'react';
import { Text, View } from 'react-native';

import { TaskNoteGetItemResponseDto } from '~/common/types/types';

import { TaskNoteCard } from './components/components';
import { styles } from './styles';

type Props = {
  notes: TaskNoteGetItemResponseDto[];
};

const TaskNotes: FC<Props> = ({ notes }) => {
  if (!notes.length) {
    return <Text style={styles.noNotes}>There are no notes yet.</Text>;
  }

  return (
    <View>
      <View style={styles.container}>
        {notes.map((note) => (
          <TaskNoteCard note={note} key={note.id} />
        ))}
      </View>
    </View>
  );
};

export { TaskNotes };
