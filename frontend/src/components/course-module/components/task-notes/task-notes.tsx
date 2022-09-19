import { FC, TaskNoteGetItemResponseDto } from 'common/types/types';

import { TaskNoteCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  notes: TaskNoteGetItemResponseDto[];
};

const TaskNotes: FC<Props> = ({ notes }) => {
  const hasNotes = Boolean(notes.length);

  return (
    <div>
      <h1>History</h1>
      {!hasNotes ? (
        <p className={styles.placeholder}>There are no notes yet.</p>
      ) : (
        notes.map(({ author, id, note, createdAt, status }) => (
          <TaskNoteCard
            key={id}
            author={author}
            note={note}
            createdAt={createdAt}
            status={status}
          />
        ))
      )}
    </div>
  );
};

export { TaskNotes };
