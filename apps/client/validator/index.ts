import { RegisterOptions } from 'react-hook-form';
import { validateUsername } from 'utils';

interface Validator {
  [key: string]: RegisterOptions;
}

const validator: Validator = {
  fullname: {
    required: 'Full name is required',
    minLength: {
      value: 3,
      message: 'Full name must be greater the two',
    },
  },
  email: {
    required: 'Email is required',
    pattern: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
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
