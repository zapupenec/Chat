/* eslint-disable import/prefer-default-export */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { httpClient } from '../../api';
import { ChannelsBox, MessagesBox, Loading } from './components';
import { channelsActions, messagesActions } from '../../store/slices';
import { useAuth } from '../../contexts';

export const ChatPage = () => {
  const { t } = useTranslation();
  const { logOut, getAuthHeader } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await httpClient.fetchData(getAuthHeader());
        const { channels, currentChannelId, messages } = data;

        dispatch(channelsActions.addChannels(channels));
        dispatch(channelsActions.setCurrentChannelId(currentChannelId));
        dispatch(channelsActions.setDedaultChannelId(currentChannelId));
        dispatch(messagesActions.addMessages(messages));

        setIsLoading(false);
      } catch (error) {
        if (error.isHttpClient) {
          const { status } = error.response;
          if (status === 401) {
            logOut();
            toast.warn(t('toasts.notAuth'));
            return;
          }
          toast.error(t('toasts.netWorkError'));
          return;
        }

        throw error;
      }
    };

    fetch();
  }, [dispatch, getAuthHeader, logOut, t]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <ChannelsBox />
        <MessagesBox />
      </Row>
    </Container>
  );
};
