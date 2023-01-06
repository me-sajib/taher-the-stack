const wordAt = (str: string, position = 0): string =>
  str.split(/\s+|,\s*/).at(position)!;

export default wordAt;
