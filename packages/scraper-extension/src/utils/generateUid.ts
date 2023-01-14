type Range = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
const generateUid = (length?: Range): string =>
  Math.random().toString(32).substring(2, 10).slice(0, length);

export default generateUid;
