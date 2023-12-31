/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { MessagesBoxHeader } from './MessagesBoxHeader';
import { MessagesBoxBody } from './MessagesBoxBody';
import { MessagesBoxFooter } from './MessagesBoxFooter';
import { channelsSelectors, messagesSelectors } from '../../../../store/slices';

export const MessagesBox = () => {
  const [hasMessageAdd, setHasMessageAdd] = useState();
  const channelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const messages = useSelector(messagesSelectors.selectMessagesByChannelId(channelId));
  const channel = useSelector(channelsSelectors.selectChannelById(channelId));

  return (
    <Col className="p-0 h-100 d-flex flex-column">
      <MessagesBoxHeader
        count={messages.length}
        name={channel && channel.name}
      />
      <MessagesBoxBody
        messages={messages}
        hasMessageAdd={hasMessageAdd}
        setHasMessageAdd={setHasMessageAdd}
      />
      <MessagesBoxFooter setHasMessageAdd={setHasMessageAdd} />
    </Col>
  );
};
