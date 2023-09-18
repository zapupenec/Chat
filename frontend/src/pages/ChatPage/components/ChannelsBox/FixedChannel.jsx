/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { channelsSelectors } from '../../../../store/slices';
import { Badge } from './Badge';

export const FixedChannel = ({
  channel, handleClickChannel, newMessagesCount,
}) => {
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
    'position-relative',
  ].join(' ');

  return (
    <Button
      className={className}
      onClick={handleClickChannel(id)}
    >
      <span className="me-1">#</span>
      {name}
      {currentChannelId !== id && <Badge newMessagesCount={newMessagesCount} />}
    </Button>
  );
};
