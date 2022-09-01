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
  return !isEditMode ? (
    <Button
      label="Edit"
      variant={ButtonVariant.SECONDARY}
      onPress={toggleEditMode}
      style={styles.button}
    />
  ) : (
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
        style={{ ...styles.button, marginLeft: 10 }}
        isLoader={isLoading}
      />
    </View>
  );
};

export { ButtonsSection };
