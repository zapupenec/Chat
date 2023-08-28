import { useSelector } from 'react-redux';

import { selectors as channelsSelectors, actions as channelsActions } from '../slices/channelsSlice';
import { selectors as messagesSelectors, actions as messagesActions } from '../slices/messagesSlice';

export const MessagesBoxBody = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  return (
    <div id="messages-box" className="chat-messages px-5 overflow-auto">
      {messages.map(([user, comment]) => (
        <div key={comment} className="text-break mb-2">
          <b>{user}</b>
          {`: ${comment}`}
        </div>
      ))}
    </div>
  );
};
