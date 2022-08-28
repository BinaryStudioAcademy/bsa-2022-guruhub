import { FC, InterviewNoteGetAllItemResponseDto } from 'common/types/types';

import { InterviewNoteCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const InterviewNoteCardList: FC<Props> = ({ notes }) => {
  return (
    <div className={styles.notesBlock}>
      {notes.map(({ id, note, author, createdAt }) => (
        <InterviewNoteCard
          key={id}
          note={note}
          authorName={author.userDetails.fullName}
          postDate={createdAt}
        />
      ))}
    </div>
  );
};

export { InterviewNoteCardList };
