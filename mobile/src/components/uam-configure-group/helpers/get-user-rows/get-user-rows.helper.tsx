import React from 'react';

import { UsersGetResponseDto } from '~/common/types/types';
import { UserTableAccessor } from '~/components/uam-configure-group/common/enums/enums';
import { UsersTableRow } from '~/components/uam-configure-group/common/types/types';
import { ActionCell } from '~/components/uam-configure-group/components/action-cell/action-cell';

type Props = {
  users: UsersGetResponseDto[];
  onToggle: (id: number) => void;
  checkedUserIds: number[];
};

const getUserRows = ({
  users,
  onToggle,
  checkedUserIds,
}: Props): UsersTableRow[] => {
  return users.map((user) => {
    const name = `userIds.${user.id}`;
    const isChecked = checkedUserIds?.includes(user.id);
    const handleCheckbox = (): void => onToggle(user.id);

    return {
      [UserTableAccessor.CHECKBOX]: (
        <ActionCell
          name={name}
          onToggle={handleCheckbox}
          isChecked={isChecked}
        />
      ),
      [UserTableAccessor.ID]: user.id,
      [UserTableAccessor.FULL_NAME]: user.fullName,
      [UserTableAccessor.EMAIL]: user.email,
      [UserTableAccessor.CREATED_AT]: user.createdAt,
    };
  });
};

export { getUserRows };
