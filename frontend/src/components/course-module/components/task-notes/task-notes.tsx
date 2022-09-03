import { FC, TaskNoteGetItemResponseDto } from 'common/types/types';

import { TaskNoteCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  notes: TaskNoteGetItemResponseDto[];
};

const TaskNotes: FC<Props> = ({ notes }) => {
  if (!notes.length) {
    return <p className={styles.placeholder}>There are no notes yet.</p>;
  }

  return (
    <div>
      <h1>History</h1>
      {notes.map(({ author, id, note, createdAt, status }) => (
        <TaskNoteCard
          key={id}
          author={author}
          note={note}
          createdAt={createdAt}
          status={status}
        />
      ))}
    </div>
  );
};

export { TaskNotes };
