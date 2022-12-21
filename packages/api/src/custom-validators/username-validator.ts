import {
  ValidateByOptions,
  ValidationOptions
} from 'class-validator';

export const usernameValidator: [
  ValidateByOptions,
  ValidationOptions
] = [
  {
    name: 'username',
    validator: {
      validate: ([
        //  TODO: This function should be import from root utils
        first,
        ...rest
      ]: string): boolean =>
        !/\d|[A-Z]/.test(first) &&
        rest.every((letter) =>
          /[a-z]|\d/.test(letter)
        )
    }
  },
  {
    message:
      'username must be lowercase & start with alphabets'
  }
];
