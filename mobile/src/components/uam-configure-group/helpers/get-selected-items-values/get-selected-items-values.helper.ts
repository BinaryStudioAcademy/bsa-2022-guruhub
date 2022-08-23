import {
  PermissionsGetAllItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';
import { SelectedItemsValues } from '~/components/uam-configure-group/common/types/types';

type Props = {
  checkedIds: number[];
  items: (UsersGetResponseDto | PermissionsGetAllItemResponseDto)[];
  namePrefix: string;
};

const getSelectedItemsValues = ({
  checkedIds,
  items,
  namePrefix,
}: Props): SelectedItemsValues => {
  return checkedIds.reduce((object, id) => {
    return {
      ...object,
      [`${namePrefix}.${id}`]: Boolean(items.find((item) => item.id === id)),
    };
  }, {});
};

export { getSelectedItemsValues };
