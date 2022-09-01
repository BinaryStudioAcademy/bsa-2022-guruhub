import { FC, TaskNoteGetItemResponseDto } from 'common/types/types';

import { TaskNoteCard } from './components/components';

type Props = {
  notes: TaskNoteGetItemResponseDto[];
};

const TaskNotes: FC<Props> = ({ notes }) => {
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
