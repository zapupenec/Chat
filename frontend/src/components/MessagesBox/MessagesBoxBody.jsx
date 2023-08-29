import { useSelector } from 'react-redux';

import { channelsSelectors, messagesSelectors } from '../../store/slices';

export const MessagesBoxBody = () => {
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const messages = useSelector(messagesSelectors.selectMessagesByChannelId(currentChannelId));

  return (
    <div id="messages-box" className="chat-messages px-5 overflow-auto">
      {messages.map(({ author, text, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{author}</b>
          {`: ${text}`}
        </div>
      ))}
    </div>
  );
};
