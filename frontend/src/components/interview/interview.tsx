import { FC } from 'common/types/types';
import { useEffect, useParams } from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { DataStatus } from '../../common/enums/app/data-status.enum';
import { useAppDispatch } from '../../hooks/use-app-dispatch/use-app-dispatch.hook';
import { useAppSelector } from '../../hooks/use-app-selector/use-app-selector.hook';
import { Spinner } from '../common/spinner/spinner';
import { InterviewNoteCardList } from './components/interview-notes-list/interview-note-cards-list';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { notes, dataStatus } = useAppSelector((state) => state.interview);

  useEffect(() => {
    if (id) {
      dispatch(interviewActions.getNotes({ interviewId: Number(id) }));
    }
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <InterviewNoteCardList notes={notes} />
    </div>
  );
};

export { Interview };
