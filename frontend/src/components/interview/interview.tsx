import { DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
  useState,
} from 'hooks/hooks';
import { interviewActions } from 'store/actions';

import { HistorySection } from './components/components';
import styles from './styles.module.scss';

const Interview: FC = () => {
  const dispatch = useAppDispatch();
  const [isInputOpen, setIsInputOpen] = useState<boolean>(false);
  const { id } = useParams();
  const { notes, dataStatus } = useAppSelector((state) => state.interview);

  const handleNoteTextAreaToggle = (): void => {
    setIsInputOpen((prev) => !prev);
  };

  useEffect(() => {
    dispatch(interviewActions.getNotes({ interviewId: Number(id) }));
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.mainColumn}>Main Content</div>
      <HistorySection
        interviewId={Number(id)}
        notes={notes}
        isOpen={isInputOpen}
        onToggle={handleNoteTextAreaToggle}
      />
    </div>
  );
};

export { Interview };
