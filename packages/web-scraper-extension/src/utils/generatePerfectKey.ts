const generatePerfectKey = <
  T extends Object
>(
  obj: T,
  duplicateKey: string
): string => {
  let postFix = 1;
  let newKey: string = duplicateKey;

  while (newKey in obj) {
    newKey = `${duplicateKey}__${++postFix}`;
  }

  return newKey;
};

export default generatePerfectKey;
