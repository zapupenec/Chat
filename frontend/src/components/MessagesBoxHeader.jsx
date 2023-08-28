import { useSelector } from 'react-redux';

import { selectors as channelsSelectors } from '../slices/channelsSlice';
import { selectors as messagesSelectors } from '../slices/messagesSlice';

export const MessagesBoxHeader = () => {
  const messages = useSelector(messagesSelectors.selectAll);

  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const currentChannel = useSelector(
    (state) => channelsSelectors.selectById(state, currentChannelId),
  );

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">#</span>
          {currentChannel && currentChannel.name}
        </b>
      </p>
      <span className="text-muted">
        {`${messages.length} сообщения`}
      </span>
    </div>
  );
};
