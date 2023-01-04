const snakeToCamelCase = (
  str: string
) =>
  str.replace(/_\w/g, (matched) =>
    matched.at(1).toUpperCase()
  );

export default snakeToCamelCase;
