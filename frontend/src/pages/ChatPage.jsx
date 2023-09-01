import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { api, socket } from '../api';
import { ChannelsBox, MessagesBox, Loading } from '../components';
import { messagesActions, channelsActions, channelsSelectors } from '../store/slices';

export const ChatPage = () => {
  const { t } = useTranslation();
  const isLoading = useSelector(channelsSelectors.selectIsLoading);

  const dispatch = useDispatch();
  useEffect(() => {
    socket.connect();

    socket.on('connect_error', () => {
      toast.error(t('toasts.netWorkError'));
    });

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', ({ id }) => {
      dispatch(channelsActions.removeChannel(id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.updateChannel({ id: channel.id, changes: channel }));
    });

    dispatch(api.fetchData());
    // .unwrap()
    // .catch((error) => {
    //   toast.error(t('toasts.netWorkError'));
    //   console.error(error);
    // });

    return () => {
      socket.offAny();
      socket.disconnect();
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
