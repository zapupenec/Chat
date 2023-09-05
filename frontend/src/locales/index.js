/* eslint-disable import/prefer-default-export */
import { ru } from './ru';

export const resources = { ru };

export const locale = {
  string: {
    min: ({ min }) => {
      switch (min) {
        case 3:
          return 'errors.min3max20';
        case 6:
          return 'errors.min6';
        default:
          throw new Error(`Unknown value min: ${min}`);
      }
    },
    max: 'errors.min3max20',
  },
  mixed: {
    required: 'errors.required',
    notOneOf: 'errors.mustBeUnique',
    oneOf: 'errors.passwordNotMatch',
  },
};
