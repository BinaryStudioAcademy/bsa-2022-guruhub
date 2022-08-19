import { useState } from '~/hooks/hooks';

type UseSelectedItemsHook<T> = {
  handleToggle: (item: T) => void;
  items: T[];
  setItems: (items: T[]) => void;
};

const useSelectedItems = <T>(items: T[]): UseSelectedItemsHook<T> => {
  const [selectedItems, setSelectedItems] = useState<T[]>(items);

  const handleAdd = (id: T): void => {
    setSelectedItems((prevState: T[]) => prevState.concat(id));
  };

  const handleRemove = (id: T): void => {
    setSelectedItems((prevState: T[]) => prevState.filter((it) => it !== id));
  };

  const handleToggle = (id: T): void => {
    selectedItems.includes(id) ? handleRemove(id) : handleAdd(id);
  };

  return { handleToggle, items: selectedItems, setItems: setSelectedItems };
};

export { useSelectedItems };
