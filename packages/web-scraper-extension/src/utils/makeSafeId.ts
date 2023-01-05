const makeSafeId = (query: string) =>
  query.replace(
    /(#)(\d+\w+)/g,
    (_matched, _selector, value): string => `[id="${value}"]`
  );

export default makeSafeId;
