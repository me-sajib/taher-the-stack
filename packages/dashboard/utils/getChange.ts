export const getChange = <
  T extends Array<T>
>(
  prev: T,
  recent: T
): Map<number, T> => {
  const map = new Map();

  if (prev.length !== recent.length) {
    return map;
  }

  return prev.reduce(
    (map, prevItem, index) => {
      if (
        JSON.stringify(prevItem) !==
        JSON.stringify(recent[index])
      ) {
        map.set(index, recent[index]);
      }

      return map;
    },
    map
  );
};
