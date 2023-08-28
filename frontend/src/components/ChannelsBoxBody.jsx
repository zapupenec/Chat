import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

import { selectors as channelsSelectors, actions as channelsActions } from '../slices/channelsSlice.js';

import { FixedChannel } from './FixedChannel.jsx';
import { RemovableChannel } from './RemovableChannel.jsx';

export const ChannelsBoxBody = () => {
  const channels = useSelector(channelsSelectors.selectAll);

  const dispatch = useDispatch();
  const handleClickChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannelId(id));
  };

  return (
    <Nav
      as="ul"
      variant="pills"
      id="channels-box"
      className="flex-column px-2 mb-3 h-100 d-block overflow-y-auto overflow-x-hidden"
    >
      {channels.map((channel) => (
        <Nav.Item key={channel.id} as="li" className="w-100">
          {
            channel.removable
              ? <RemovableChannel channel={channel} handleClickChannel={handleClickChannel} />
              : <FixedChannel channel={channel} handleClickChannel={handleClickChannel} />
          }
        </Nav.Item>
      ))}
    </Nav>
  );
};
