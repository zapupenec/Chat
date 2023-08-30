import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { channelsSelectors, messagesSelectors } from '../../store/slices';

export const MessagesBoxHeader = () => {
  const { t } = useTranslation();

  const channelId = useSelector(channelsSelectors.selectCurrentChannelId);
  const channel = useSelector(
    (state) => channelsSelectors.selectById(state, channelId),
  );
  const messages = useSelector(messagesSelectors.selectMessagesByChannelId(channelId));

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0">
        <b>
          <span className="me-1">#</span>
          {channel && channel.name}
        </b>
      </p>
      <span className="text-muted">
        {t('messagesBox.messagesCount', { count: messages.length })}
      </span>
    </div>
  );
};
