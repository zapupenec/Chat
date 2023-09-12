/* eslint-disable import/prefer-default-export */
import { ru } from './ru';

export const resources = { ru };

export const locale = {
  string: {
    min: ({ path }) => {
      switch (path) {
        case 'name':
          return 'errors.channelNameLength';
        case 'username':
          return 'errors.usernameLength';
        case 'password':
          return 'errors.passwordLength';
        default:
          throw new Error(`Unknown path: ${path}`);
      }
    },
    max: ({ path }) => {
      switch (path) {
        case 'name':
          return 'errors.channelNameLength';
        case 'username':
          return 'errors.usernameLength';
        default:
          throw new Error(`Unknown path: ${path}`);
      }
    },
  },
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.mustBeUnique',
    oneOf: 'errors.passwordNotMatch',
  },
};
