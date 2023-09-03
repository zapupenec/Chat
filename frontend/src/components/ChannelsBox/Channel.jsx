/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { Nav } from 'react-bootstrap';

import { channelsActions } from '../../store/slices';
import { FixedChannel } from './FixedChannel';
import { RemovableChannel } from './RemovableChannel';

export const Channel = memo(({ channel }) => {
  const dispatch = useDispatch();
  const handleClickChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  return (
    <Nav.Item as="li" className="w-100">
      {
        channel.removable
          ? <RemovableChannel channel={channel} handleClickChannel={handleClickChannel} />
          : <FixedChannel channel={channel} handleClickChannel={handleClickChannel} />
      }
    </Nav.Item>
  );
});
