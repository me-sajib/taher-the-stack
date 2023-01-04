const camelToKebabCase = (
  camelCase: string
): string =>
  camelCase.replace(
    /[A-Z]/g,
    (capitalLetter) =>
      `-${capitalLetter.toLowerCase()}`
  );

export default camelToKebabCase;
