import { FC, TaskNoteFormRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { taskNoteCreate as taskNoteCreateValidationSchema } from 'validation-schemas/validation-schemas';

import { CREATE_NOTE_DEFAULT_VALUES } from './common';
import styles from './styles.module.scss';

const INPUT_NUMBER_OF_ROWS = 5;

type Props = {
  onApprove: (payload: TaskNoteFormRequestDto) => void;
  onReject: (payload: TaskNoteFormRequestDto) => void;
};

const TaskManipulate: FC<Props> = ({ onApprove, onReject }) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<TaskNoteFormRequestDto>({
      defaultValues: CREATE_NOTE_DEFAULT_VALUES,
      validationSchema: taskNoteCreateValidationSchema,
    });

  const handleNoteApprove = (payload: TaskNoteFormRequestDto): void => {
    onApprove(payload);
    reset();
  };

  const handleNoteReject = (payload: TaskNoteFormRequestDto): void => {
    onReject(payload);
    reset();
  };

  return (
    <form className={styles.form}>
      <Input
        control={control}
        errors={errors}
        label="Enter message"
        name={getNameOf<TaskNoteFormRequestDto>('note')}
        rows={INPUT_NUMBER_OF_ROWS}
      />
      <div className={styles.buttonWrapper}>
        <Button
          label="Accept the task"
          type="submit"
          btnType="filled"
          btnColor="blue"
          onClick={handleSubmit(handleNoteApprove)}
        />
        <Button
          label="Reject the task"
          type="submit"
          btnType="outlined"
          btnColor="blue"
          onClick={handleSubmit(handleNoteReject)}
        />
      </div>
    </form>
  );
};

export { TaskManipulate };
