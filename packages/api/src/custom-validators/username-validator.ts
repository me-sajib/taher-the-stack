import { validateUsername } from '@proxy-manager/utils';

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
      validate: validateUsername
    }
  },
  {
    message:
      'username must be lowercase & start with alphabets'
  }
];
