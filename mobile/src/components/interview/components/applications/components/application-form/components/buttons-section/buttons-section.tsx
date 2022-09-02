import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { Button, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  isEditMode: boolean;
  toggleEditMode: () => void;
  handleEditInterviewer: () => void;
  isLoading?: boolean;
};

const ButtonsSection: FC<Props> = ({
  isEditMode,
  toggleEditMode,
  handleEditInterviewer,
  isLoading,
}) => {
  if (!isEditMode) {
    return (
      <Button
        label="Edit"
        variant={ButtonVariant.SECONDARY}
        onPress={toggleEditMode}
        style={styles.button}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Button
        label="Cancel"
        variant={ButtonVariant.SECONDARY}
        onPress={toggleEditMode}
        style={styles.button}
      />
      <Button
        label="Save"
        variant={ButtonVariant.PRIMARY}
        onPress={handleEditInterviewer}
        style={{ ...styles.button, ...styles.saveButton }}
        isLoading={isLoading}
      />
    </View>
  );
};

export { ButtonsSection };
