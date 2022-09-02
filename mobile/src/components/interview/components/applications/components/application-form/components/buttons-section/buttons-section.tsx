import React, { FC } from 'react';

import { AppColor, ButtonVariant } from '~/common/enums/enums';
import { Button, Stack } from '~/components/common/common';

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
    <Stack isHorizontal space={10}>
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
        style={styles.button}
        isLoading={isLoading}
        loaderColor={AppColor.TEXT.GRAY_100}
      />
    </Stack>
  );
};

export { ButtonsSection };
