/* eslint-disable import/prefer-default-export */
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';

import { MessagesBoxHeader } from './MessagesBoxHeader';
import { MessagesBoxBody } from './MessagesBoxBody';
import { MessagesBoxFooter } from './MessagesBoxFooter';
import { channelsSelectors, messagesSelectors } from '../../store/slices';

export const MessagesBox = () => {
  const channelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const historyLength = useSelector(channelsSelectors.selectHistoryLength);
  const messages = useSelector(messagesSelectors.selectMessagesByChannelId(channelId))
    .slice(-historyLength);

  const channel = useSelector(
    (state) => channelsSelectors.selectById(state, channelId),
  );

  return (
    <Col className="p-0 h-100 d-flex flex-column">
      <MessagesBoxHeader
        count={messages.length}
        name={channel && channel.name}
      />
      <MessagesBoxBody messages={messages} />
      <MessagesBoxFooter />
    </Col>
  );
};
