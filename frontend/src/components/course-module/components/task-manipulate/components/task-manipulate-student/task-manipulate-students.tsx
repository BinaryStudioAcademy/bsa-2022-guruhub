import { FC, TaskNoteFormRequestDto } from 'common/types/types';
import { Button, Input } from 'components/common/common';
import { getNameOf } from 'helpers/helpers';
import { useAppForm } from 'hooks/hooks';
import { taskNoteCreate as taskNoteCreateValidationSchema } from 'validation-schemas/validation-schemas';

import styles from './styles.module.scss';

const INPUT_NUMBER_OF_ROWS = 5;

type Props = {
  onSubmit: (payload: TaskNoteFormRequestDto) => void;
  defaultValues: TaskNoteFormRequestDto;
};

const TaskManipulateStudent: FC<Props> = ({ onSubmit, defaultValues }) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<TaskNoteFormRequestDto>({
      defaultValues,
      validationSchema: taskNoteCreateValidationSchema,
    });

  const handleNoteSubmit = (payload: TaskNoteFormRequestDto): void => {
    onSubmit(payload);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleNoteSubmit)} className={styles.form}>
      <Input
        control={control}
        errors={errors}
        label="Enter message"
        name={getNameOf<TaskNoteFormRequestDto>('note')}
        rows={INPUT_NUMBER_OF_ROWS}
      />
      <div className={styles.buttonWrapper}>
        <Button
          label="Send on review"
          type="submit"
          btnType="filled"
          btnColor="blue"
        />
      </div>
    </form>
  );
};

export { TaskManipulateStudent };
