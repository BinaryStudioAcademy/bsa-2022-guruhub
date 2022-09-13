import {
  FC,
  InterviewNoteCreateRequestDto,
  InterviewNoteGetAllItemResponseDto,
} from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppDispatch, useAppForm } from 'hooks/hooks';
import { interviewActions } from 'store/actions';
import { interviewNotesCreateArguments } from 'validation-schemas/validation-schemas';

import { DEFAULT_CREATE_NOTE_PAYLOAD } from './common';
import { InterviewNoteCardList } from './components/components';
import styles from './styles.module.scss';

type Props = {
  interviewId: number;
  notes: InterviewNoteGetAllItemResponseDto[];
  isOpen: boolean;
  onToggle: () => void;
};

const HistorySection: FC<Props> = ({
  interviewId,
  notes,
  isOpen,
  onToggle,
}) => {
  const dispatch = useAppDispatch();
  const { control, errors, handleSubmit, reset } =
    useAppForm<InterviewNoteCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_NOTE_PAYLOAD,
      validationSchema: interviewNotesCreateArguments,
    });

  const handleToggleNoteContentClear = (): void => {
    reset();
    onToggle();
  };

  const handleNoteSubmit = (payload: InterviewNoteCreateRequestDto): void => {
    const { note } = payload;
    dispatch(interviewActions.createNote({ note, interviewId }));
    onToggle();
  };

  return (
    <div className={styles.history}>
      <div className={styles.historyHeading}>
        <h2>Notes</h2>
        {!isOpen && (
          <div className={styles.addButtonWrapper}>
            <Button label="+ Add" btnColor="blue" onClick={onToggle} />
          </div>
        )}
      </div>
      <div className={styles.noteInput}>
        {isOpen && (
          <form onSubmit={handleSubmit(handleNoteSubmit)}>
            <Input
              type="text"
              label="Write your note"
              name={getNameOf<InterviewNoteCreateRequestDto>('note')}
              control={control}
              errors={errors}
              rows={3}
              placeholder="Your note here"
            />
            <div className={styles.actionButtonsSection}>
              <div className={styles.buttonWrapper}>
                <Button
                  label="Cancel"
                  btnColor="gray"
                  onClick={handleToggleNoteContentClear}
                />
              </div>
              <div className={styles.buttonWrapper}>
                <Button label="Submit" btnColor="blue" type="submit" />
              </div>
            </div>
          </form>
        )}
      </div>
      <InterviewNoteCardList notes={notes} />
    </div>
  );
};

export { HistorySection };
