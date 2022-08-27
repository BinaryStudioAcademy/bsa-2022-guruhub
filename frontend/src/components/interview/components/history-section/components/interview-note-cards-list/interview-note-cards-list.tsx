import { FC, InterviewNoteGetAllItemResponseDto } from 'common/types/types';

import { InterviewNoteCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const InterviewNoteCardList: FC<Props> = ({ notes }) => {
  return (
    <div className={styles.notesBlock}>
      {notes.map((note) => (
        <InterviewNoteCard
          key={note.id}
          note={note.note}
          authorName={note.author.userDetails.fullName}
          postDate={note.createdAt}
        />
      ))}
    </div>
  );
};

export { InterviewNoteCardList };
