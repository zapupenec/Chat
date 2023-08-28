import { ReactComponent as ArrowRightSquare } from '../assets/icons/arrow-right-square.svg';
import { ReactComponent as PlusSquare } from '../assets/icons/plus-square.svg';

export const Icon = ({ name, size }) => {
  switch (name) {
    case 'arrow-right-square':
      return <ArrowRightSquare width={size} height={size} />;
    case 'plus-square':
      return <PlusSquare width={size} height={size} />;
    default:
      throw new Error(`Unknown icon name: ${name}`);
  }
};