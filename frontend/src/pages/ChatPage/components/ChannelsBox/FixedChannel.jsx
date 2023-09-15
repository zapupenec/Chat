/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { channelsSelectors } from '../../../../store/slices';

export const FixedChannel = ({ channel, handleClickChannel }) => {
  const { id, name } = channel;
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const className = [
    'btn',
    'btn-secondary',
    `${currentChannelId === id ? '' : 'btn-light'}`,
    'rounded-0',
    'w-100',
    'text-start',
    'd-block',
    'text-truncate',
  ].join(' ');

  return (
    <Button
      className={className}
      onClick={handleClickChannel(id)}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};
