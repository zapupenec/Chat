/* eslint-disable import/prefer-default-export */
import { useTranslation } from 'react-i18next';

export const Badge = ({ newMessagesCount }) => {
  const { t } = useTranslation();

  if (newMessagesCount <= 0) {
    return null;
  }

  return (
    <span className="position-absolute top-50 end-0 translate-middle-y badge rounded-pill bg-primary">
      {newMessagesCount > 99 ? '99+' : newMessagesCount}
      <span className="visually-hidden">{t('chatPage.channelsBox.unreadMessages', { count: newMessagesCount })}</span>
    </span>
  );
};
