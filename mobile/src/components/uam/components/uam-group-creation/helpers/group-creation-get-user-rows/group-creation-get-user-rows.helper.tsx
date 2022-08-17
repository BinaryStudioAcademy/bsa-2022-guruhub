import React from 'react';

import {
  FormControl,
  GroupsCreateRequestDto,
  GroupsItemResponseDto,
} from '~/common/types/types';
import { Checkbox } from '~/components/common/common';

import { UserTableAccessor } from '../../common/enums/user-table-accessor.enum';

type Props = {
  users: GroupsItemResponseDto[];
  control: FormControl<GroupsCreateRequestDto>;
  onCheckbox: (id: number) => void;
};

const getUserRows = ({
  users,
  control,
  onCheckbox,
}: Props): GroupsItemResponseDto[] => {
  return users.map((user) => {
    return {
      [UserTableAccessor.CHECKBOX]: (
        <Checkbox
          name={user.email}
          control={control}
          onCheckbox={(): void => onCheckbox(user.id)}
        />
      ),
      [UserTableAccessor.ID]: user.id,
      [UserTableAccessor.FULL_NAME]: user.fullName,
      [UserTableAccessor.EMAIL]: user.email,
    };
  });
};

export { getUserRows };
