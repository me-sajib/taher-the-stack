import { validateUsername } from 'utils';
import { RegisterOptions } from 'react-hook-form';

interface Validator {
  [key: string]: RegisterOptions;
}

const validator: Validator = {
  fullname: {
    required: 'Full name is required',
    minLength: {
      value: 3,
      message: 'Full name must be greater the two characters',
    },
  },
  email: {
    required: 'Email is required',
    validate: (value) =>
      /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value) ||
      'Email is invalid',
  },
  username: {
    required: 'Username is required',
    validate: (value: string): boolean | string =>
      validateUsername(value) ||
      'Username must be lowercase & start with alphabets',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 5,
      message: 'Password length must be greater than four',
    },
  },
};

export default validator;
