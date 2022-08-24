import {
  PermissionsGetAllItemResponseDto,
  UsersGetResponseDto,
} from '~/common/types/types';

type Props = {
  checkedIds: number[];
  items: (UsersGetResponseDto | PermissionsGetAllItemResponseDto)[];
  namePrefix: string;
};

const getSelectedItemsValues = ({
  checkedIds,
  items,
  namePrefix,
}: Props): Record<string, boolean> => {
  return checkedIds.reduce((object, id) => {
    return {
      ...object,
      [`${namePrefix}.${id}`]: Boolean(items.find((item) => item.id === id)),
    };
  }, {});
};

export { getSelectedItemsValues };
