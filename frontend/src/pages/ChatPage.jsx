/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { api, socketAPI } from '../api';
import { ChannelsBox, MessagesBox, Loading } from '../components';
import { messagesActions, channelsActions, channelsSelectors } from '../store/slices';

export const ChatPage = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(channelsSelectors.selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    socketAPI.connect();

    socketAPI.connectError(() => {
      toast.error(t('toasts.netWorkError'));
    });

    socketAPI.recieveMessage((message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socketAPI.recieveChannel((channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socketAPI.recieveRemoveChannel((channel) => {
      dispatch(channelsActions.removeChannel(channel.id));
    });

    socketAPI.recieveRenameChannel((channel) => {
      dispatch(channelsActions.updateChannel({ id: channel.id, changes: channel }));
    });

    dispatch(api.fetchData());

    return () => {
      socketAPI.unsubscribeAll();
      socketAPI.disconnect();
    };
  }, [dispatch, t]);

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
