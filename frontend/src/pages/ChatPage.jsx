import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row } from 'react-bootstrap';

import { api, socket } from '../api';
import { ChannelsBox, MessagesBox } from '../components';
import { messagesActions, channelsActions } from '../store/slices';

export const ChatPage = () => {
  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    };
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(api.fetchData());

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
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <ChannelsBox />
        <MessagesBox />
      </Row>
    </Container>
  );
};
