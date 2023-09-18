/* eslint-disable import/prefer-default-export */
import { ReactComponent as ArrowRightSquare } from './assets/arrow-right-square.svg';
import { ReactComponent as ChevronDown } from './assets/chevron-down.svg';
import { ReactComponent as PlusSquare } from './assets/plus-square.svg';
import { ReactComponent as ErrorSVG } from './assets/error.svg';

export const Icon = ({ name, size }) => {
  switch (name) {
    case 'arrow-right-square':
      return <ArrowRightSquare width={size} height={size} />;
    case 'chevron-down':
      return <ChevronDown width={size} height={size} />;
    case 'error':
      return <ErrorSVG width={size} height={size} />;
    case 'plus-square':
      return <PlusSquare width={size} height={size} />;
    default:
      throw new Error(`Unknown icon name: ${name}`);
  }
};
