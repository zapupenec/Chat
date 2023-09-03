/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

import { channelsSelectors } from '../../store/slices';

export const FixedChannel = ({ channel, handleClickChannel }) => {
  const { id, name } = channel;
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  return (
    <Button
      variant={currentChannelId === id ? 'secondary' : 'secondary-outline'}
      className="rounded-0 w-100 text-start d-block text-truncate"
      onClick={handleClickChannel(id)}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );
};
