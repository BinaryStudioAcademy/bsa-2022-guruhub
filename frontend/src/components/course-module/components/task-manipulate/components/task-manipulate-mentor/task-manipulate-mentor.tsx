import { FC, TaskNoteFormRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { taskNoteCreate } from 'validation-schemas/validation-schemas';

import styles from './styles.module.scss';

type Props = {
  onApprove: (payload: TaskNoteFormRequestDto) => void;
  onReject: (payload: TaskNoteFormRequestDto) => void;
  defaultValues: TaskNoteFormRequestDto;
};

const TaskManipulateMentor: FC<Props> = ({
  onApprove,
  onReject,
  defaultValues,
}) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<TaskNoteFormRequestDto>({
      defaultValues,
      validationSchema: taskNoteCreate,
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

export { TaskManipulateMentor };
