import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { Button, Stack, View } from '~/components/common/common';

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
      <View>
        <Button
          label="Cancel"
          variant={ButtonVariant.CANCEL}
          size="small"
          onPress={toggleEditMode}
        />
      </View>
      <View>
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
