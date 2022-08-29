import React from 'react';

import { FormControl, UsersGetResponseDto } from '~/common/types/types';
import { Checkbox } from '~/components/common/common';
import { UserTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { UsersTableRow } from '~/components/uam-configure-group/common/types/types';
import { getFormattedDate } from '~/helpers/helpers';

type Props = {
  users: UsersGetResponseDto[];
  control: FormControl;
  onToggle: (id: number) => void;
};

const getUserRows = ({ users, onToggle, control }: Props): UsersTableRow[] => {
  return users.map((user) => {
    const handleCheckbox = (): void => onToggle(user.id);

    return {
      [UserTableAccessor.CHECKBOX]: (
        <Checkbox
          name={`userIds.${user.id}`}
          control={control}
          onToggle={handleCheckbox}
        />
      ),
      [UserTableAccessor.ID]: user.id,
      [UserTableAccessor.FULL_NAME]: user.fullName,
      [UserTableAccessor.EMAIL]: user.email,
      [UserTableAccessor.CREATED_AT]: `${getFormattedDate(
        user.createdAt,
        'distance',
      )} ago`,
    };
  });
};

export { getUserRows };
