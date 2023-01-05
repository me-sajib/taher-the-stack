const addClass = (...classes: any[]): string =>
  classes
    .reduce((acc, cur) => (cur ? `${acc} ${cur}` : acc), '')
    .trim();

export default addClass;
