import { useState } from 'react';

const useSelection = <SelectionType = unknown>() => {
  const [selects, setSelects] = useState<Set<SelectionType>>(
    new Set()
  );

  const handleClick = (item: SelectionType) => () => {
    const newSelects = new Set(selects);

    newSelects.has(item)
      ? newSelects.delete(item)
      : newSelects.add(item);

    setSelects(newSelects);
  };

  const handleSelectAllClick =
    (allItems: SelectionType[]) =>
    (event: React.MouseEvent<HTMLInputElement>) => {
      if ((event.target as HTMLInputElement).checked) {
        return setSelects(new Set(allItems));
      }

      setSelects(new Set());
    };

  const clearSelection = () => setSelects(new Set());

  return {
    selects,
    clearSelection,
    handleClick,
    handleSelectAllClick
  };
};

export default useSelection;
