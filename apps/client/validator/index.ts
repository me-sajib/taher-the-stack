import { RegisterOptions, ValidationValueMessage } from 'react-hook-form';
import { validateUsername } from 'utils';

interface ValidatorPattern {
  [key: string]: RegisterOptions;
}

const validator: ValidatorPattern = {
  fullname: {
    required: 'Full name is required',
    minLength: {
      value: 3,
      message: 'Full name must be greater than two characters',
    },
    maxLength: {
      value: 49,
      message: 'Full name must be less than fifty characters',
    },
  },
  name: {
    required: 'Name is required',
    minLength: {
      value: 3,
      message: 'Name must be greater than two characters',
    },
    maxLength: {
      value: 99,
      message: 'Name must be less than hundrad characters',
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
      'Username must be lowercase letters & start with alphabets',
  },
  password: {
    required: 'Password is required',
    minLength: {
      value: 5,
      message: 'Password length must be greater than four',
    },
  },
  port: {
    required: 'Port is required',
    validate: (value) =>
      // copied from: https://ihateregex.io/expr/port/
      /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/.test(
        value
      ) || 'Invalid port number',
  },
  host: {
    required: 'Host is required',
    validate: (value) =>
      // copied from: https://ihateregex.io/expr/ip/
      /(\b25[0-5]|\b2[0-4][0-9]|\b[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}/.test(
        value
      ) ||
      // copied from: https://ihateregex.io/expr/ipv6/
      /(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))/.test(
        value
      ) ||
      'Invalid proxy IP, required (IPv4 or IPv6)',
  },
};

export class Validator<T extends ObjectConstructor> {
  constructor(private validateObject: T) {}

  private required(key: string, value: string) {
    return value.length === 0 && validator[key].required;
  }

  private minLength(key: string, curValue: string) {
    const { value, message } = validator[key]
      .minLength as ValidationValueMessage;
    return curValue.length < value && message;
  }

  private maxLength(key: string, curValue: string) {
    const { value, message } = validator[key]
      .maxLength as ValidationValueMessage;
    return curValue.length > value && message;
  }

  private validate(key: string, value: string) {
    return (validator[key].validate as any)(value);
  }

  lunch() {
    for (const name in this.validateObject) {
      const options = validator[name];
      const value = this.validateObject[name];

      console.log({ options, value, name });

      for (const key in options) {
        switch (key) {
          case 'required': {
            const isMatch = this.required(name, value as string);

            if (isMatch) {
              return isMatch;
            }

            break;
          }
          case 'maxLength': {
            const isMatch = this.maxLength(name, value as string);

            if (isMatch) {
              return isMatch;
            }

            break;
          }
          case 'minLength': {
            const isMatch = this.minLength(name, value as string);

            if (isMatch) {
              return isMatch;
            }

            break;
          }
          case 'validate': {
            const isMatch = this.validate(name, value as string);

            if (typeof isMatch === 'string') {
              return isMatch;
            }

            break;
          }
          default:
            break;
        }
      }
    }

    return true;
  }
}

export default validator;
