import { ValidateByOptions, ValidationOptions } from 'class-validator';
// import { validateUsername } from 'utils';

export const usernameValidator: [ValidateByOptions, ValidationOptions] = [
  {
    name: 'username',
    validator: {
      validate: () => null, // TODO: have to change as validateUsername pass
    },
  },
  {
    message: 'username must be lowercase & start with alphabets',
  },
];
