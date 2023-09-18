/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import {
  memo, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';

import { channelsActions, channelsSelectors, messagesSelectors } from '../../../../store/slices';
import { FixedChannel } from './FixedChannel';
import { RemovableChannel } from './RemovableChannel';

export const Channel = memo(({ channel }) => {
  const dispatch = useDispatch();
  const messages = useSelector(messagesSelectors.selectMessagesByChannelId(channel.id));

  const prevMessagesCount = useRef(messages.length);
  const [newMessagesCount, setNewMessagesCount] = useState(
    (prevMessagesCount.current - messages.length),
  );
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const handleClickChannel = (id) => () => {
    dispatch(channelsActions.setCurrentChannelId(id));
    prevMessagesCount.current = messages.length;
    setNewMessagesCount(0);
  };

  useEffect(() => {
    if (currentChannelId !== channel.id) {
      setNewMessagesCount(messages.length - prevMessagesCount.current);
    } else {
      prevMessagesCount.current = messages.length;
    }
  }, [messages.length, channel.id, currentChannelId]);

  return (
    <Nav.Item as="li" className="w-100">
      {
        channel.removable
          ? (
            <RemovableChannel
              channel={channel}
              handleClickChannel={handleClickChannel}
              newMessagesCount={newMessagesCount}
            />
          )
          : (
            <FixedChannel
              channel={channel}
              handleClickChannel={handleClickChannel}
              newMessagesCount={newMessagesCount}
            />
          )
      }
    </Nav.Item>
  );
});
