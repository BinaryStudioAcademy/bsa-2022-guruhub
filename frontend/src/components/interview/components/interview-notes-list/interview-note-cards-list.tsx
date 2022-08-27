import { FC, InterviewNoteGetAllItemResponseDto } from 'common/types/types';

import { InterviewNoteCard } from './components/interview-note/interview-note-card';
import styles from './styles.module.scss';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const InterviewNoteCardList: FC<Props> = ({ notes }: Props) => {
  return (
    <div className={styles.notesBlock}>
      {notes.map((note) => (
        <InterviewNoteCard
          note={note.note}
          authorName={note.author.fullName}
          postDate={note.createdAt}
        />
      ))}
    </div>
  );
};

export { InterviewNoteCardList };
