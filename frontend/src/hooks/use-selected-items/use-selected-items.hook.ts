import { useState } from 'hooks/hooks';

type UseSelectedItemsHook<T> = {
  handleAdd: (item: T) => void;
  handleRemove: (item: T) => void;
  handleToggle: (item: T) => void;
  items: T[];
  setItems: (items: T[]) => void;
};

const useSelectedItems = <T extends number>(
  items: T[],
): UseSelectedItemsHook<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(items);

  const handleAdd = (id: T): void => {
    setSelectedItems((prevState: T[]) => prevState.concat(id));
  };

  const handleRemove = (id: T): void => {
    setSelectedItems((prevState: T[]) => prevState.filter((it) => it !== id));
  };

  const handleToggle = (id: T): void => {
    setSelectedItems((prevState) => {
      return prevState.includes(id)
        ? prevState.filter((it) => it !== id)
        : prevState.concat(id);
    });
  };

  return {
    handleAdd,
    handleRemove,
    handleToggle,
    items: selectedItems,
    setItems: setSelectedItems,
  };
};

export { useSelectedItems };
