import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { TaskNoteFormRequestDto } from '~/common/types/types';
import { Button, Input, View } from '~/components/common/common';
import { useAppForm } from '~/hooks/hooks';
import { taskNoteCreate as taskNoteCreateValidationSchema } from '~/validation-schemas/validation-schemas';

import { CREATE_NOTE_DEFAULT_VALUES } from './common';
import { styles } from './styles';

type Props = {
  isMentor: boolean;
  isLoading?: boolean;
  onSendOnReview: (payload: TaskNoteFormRequestDto) => void;
  onApprove: (payload: TaskNoteFormRequestDto) => void;
  onReject: (payload: TaskNoteFormRequestDto) => void;
};

const TaskMessageArea: FC<Props> = ({
  isMentor,
  isLoading,
  onSendOnReview,
  onApprove,
  onReject,
}) => {
  const { control, errors, handleSubmit, reset } =
    useAppForm<TaskNoteFormRequestDto>({
      defaultValues: CREATE_NOTE_DEFAULT_VALUES,
      validationSchema: taskNoteCreateValidationSchema,
    });

  const handleSendOnReview = (payload: TaskNoteFormRequestDto): void => {
    onSendOnReview(payload);
    reset();
  };

  const handleApprove = (payload: TaskNoteFormRequestDto): void => {
    onApprove(payload);
    reset();
  };

  const handleReject = (payload: TaskNoteFormRequestDto): void => {
    onReject(payload);
    reset();
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
                onPress={handleSubmit(handleApprove)}
                size="small"
                isLoading={isLoading}
              />
            </View>
            <View style={styles.button}>
              <Button
                label="Reject the task"
                variant={ButtonVariant.SECONDARY}
                size="small"
                onPress={handleSubmit(handleReject)}
                isLoading={isLoading}
              />
            </View>
          </View>
        ) : (
          <View style={styles.button}>
            <Button
              label="Send on review"
              variant={ButtonVariant.PRIMARY}
              onPress={handleSubmit(handleSendOnReview)}
              isLoading={isLoading}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export { TaskMessageArea };
