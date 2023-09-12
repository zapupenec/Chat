/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Nav } from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars-2';

import { channelsSelectors } from '../../../../store/slices';
import { Channel } from './Channel';

export const ChannelsBoxBody = () => {
  const scrollbarsRef = useRef(null);
  const channels = useSelector(channelsSelectors.selectAll);

  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const defaultChannelId = channels[0].id;
  const lastChannelId = channels.at(-1).id;

  useEffect(() => {
    if (currentChannelId === defaultChannelId) {
      scrollbarsRef.current.view.scroll({
        top: 0,
        behavior: 'smooth',
      });
    }

    if (currentChannelId === lastChannelId) {
      scrollbarsRef.current.view.scroll({
        top: scrollbarsRef.current.getScrollHeight(),
        behavior: 'smooth',
      });
    }
  }, [currentChannelId, defaultChannelId, lastChannelId]);

  return (
    <Scrollbars
      style={{ width: '100%', height: '100%' }}
      ref={scrollbarsRef}
    >
      <Nav
        as="ul"
        variant="pills"
        id="channels-box"
        className="px-2"
      >
        {channels.map((channel) => <Channel key={channel.id} channel={channel} />)}
      </Nav>
    </Scrollbars>
  );
};
