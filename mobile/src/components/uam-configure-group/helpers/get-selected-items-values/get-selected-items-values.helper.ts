type Props = {
  checkedIds: number[];
  items: number[];
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
      [`${namePrefix}.${id}`]: Boolean(items.find((itemId) => itemId === id)),
    };
  }, {});
};

export { getSelectedItemsValues };
