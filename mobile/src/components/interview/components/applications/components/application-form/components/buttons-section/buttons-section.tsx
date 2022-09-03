import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { Button, Stack, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  toggleEditMode: () => void;
  handleEditInterviewer: () => void;
  isLoading?: boolean;
};

const ButtonsSection: FC<Props> = ({
  toggleEditMode,
  handleEditInterviewer,
  isLoading,
}) => {
  return (
    <Stack isHorizontal space={40}>
      <View style={styles.button}>
        <Button
          label="Cancel"
          variant={ButtonVariant.SECONDARY}
          size="small"
          onPress={toggleEditMode}
        />
      </View>
      <View style={styles.button}>
        <Button
          label="Save"
          variant={ButtonVariant.PRIMARY}
          onPress={handleEditInterviewer}
          size="small"
          isLoading={isLoading}
        />
      </View>
    </Stack>
  );
};

export { ButtonsSection };
