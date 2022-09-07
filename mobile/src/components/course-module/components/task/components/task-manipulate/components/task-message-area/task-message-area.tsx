import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { TaskNoteFormRequestDto } from '~/common/types/types';
import { Button, Input, View } from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { taskNoteCreate as taskNoteCreateValidationSchema } from '~/validation-schemas/validation-schemas';

import { CREATE_NOTE_DEFAULT_VALUES } from './common';
import { styles } from './styles';

type Props = {
  isMentor?: boolean;
  isLoading?: boolean;
  onSubmit: (payload: TaskNoteFormRequestDto) => void;
  onReject?: (payload: TaskNoteFormRequestDto) => void;
};

const TaskMessageArea: FC<Props> = ({
  isMentor = false,
  isLoading,
  onSubmit,
  onReject,
}) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<TaskNoteFormRequestDto>({
      defaultValues: CREATE_NOTE_DEFAULT_VALUES,
      validationSchema: taskNoteCreateValidationSchema,
    });

  const handleNoteSubmit = (payload: TaskNoteFormRequestDto): void => {
    onSubmit(payload);
    reset();
  };

  const handleNoteReject = (payload: TaskNoteFormRequestDto): void => {
    if (onReject) {
      onReject(payload);
      reset();
    }
  };

  return (
    <View style={styles.inputContainer}>
      <Input
        label="Message"
        placeholder="..."
        errors={errors}
        control={control}
        name="note"
        rows={5}
      />
      <View style={styles.buttonContainer}>
        {isMentor ? (
          <View>
            <View style={styles.button}>
              <Button
                label="Accept the task"
                variant={ButtonVariant.PRIMARY}
                onPress={handleSubmit(handleNoteSubmit)}
                size="small"
                isLoading={isLoading}
              />
            </View>
            <View style={styles.button}>
              <Button
                label="Reject the task"
                variant={ButtonVariant.SECONDARY}
                size="small"
                onPress={handleSubmit(handleNoteReject)}
                isLoading={isLoading}
              />
            </View>
          </View>
        ) : (
          <View style={styles.button}>
            <Button
              label="Send on review"
              variant={ButtonVariant.PRIMARY}
              onPress={handleSubmit(handleNoteSubmit)}
              isLoading={isLoading}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export { TaskMessageArea };
