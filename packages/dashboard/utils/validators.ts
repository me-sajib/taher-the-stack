export const validateUsername = ([first, ...rest]: string): boolean =>
  !/\d|[A-Z]/.test(first) && rest.every((letter) => /[a-z0-9_-]/.test(letter));
