import defaultAvatar from 'assets/img/avatar-default.svg';
import { FC, InterviewNoteGetAllItemResponseDto } from 'common/types/types';

import { InterviewNoteCard } from './components/components';
import styles from './styles.module.scss';

type Props = {
  notes: InterviewNoteGetAllItemResponseDto[];
};

const InterviewNoteCardList: FC<Props> = ({ notes }) => {
  const hasNotes = Boolean(notes.length);

  if (!hasNotes) {
    return <p className={styles.placeholder}>No data to display</p>;
  }

  return (
    <div className={styles.notesBlock}>
      {notes.map(({ id, note, author, createdAt }) => (
        <InterviewNoteCard
          key={id}
          note={note}
          authorName={author.userDetails.fullName}
          postDate={createdAt}
          authorAvatar={author.userDetails.avatar?.url ?? defaultAvatar}
        />
      ))}
    </div>
  );
};

export { InterviewNoteCardList };
