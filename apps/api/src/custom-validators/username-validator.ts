import { ValidateByOptions, ValidationOptions } from 'class-validator';
import { validateUsername } from 'utils';

export const usernameValidator: [ValidateByOptions, ValidationOptions] = [
  {
    name: 'username',
    validator: {
      validate: validateUsername,
    },
  },
  {
    message: 'username must be lowercase & start with alphabets',
  },
];
