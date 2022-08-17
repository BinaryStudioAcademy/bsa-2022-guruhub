import React from 'react';

import { FormControl, UsersGetResponseDto } from '~/common/types/types';
import { Checkbox } from '~/components/common/common';
import { UserTableAccessor } from '~/components/uam-groups-create/common/enums/enums';
import { UsersTableRow } from '~/components/uam-groups-create/common/types/types';

type Props = {
  users: UsersGetResponseDto[];
  control: FormControl;
  onCheckbox: (id: number) => void;
};

const getUserRows = ({
  users,
  control,
  onCheckbox,
}: Props): UsersTableRow[] => {
  return users.map((user) => {
    const handleCheckbox = (): void => onCheckbox(user.id);

    return {
      [UserTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`userIds.${user.id}`}
          control={control}
          onCheckbox={handleCheckbox}
        />
      ),
      [UserTableAccessor.ID]: user.id,
      [UserTableAccessor.FULL_NAME]: user.fullName,
      [UserTableAccessor.EMAIL]: user.email,
    };
  });
};

export { getUserRows };
