import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Row, Col,
} from 'react-bootstrap';
import axios from 'axios';

import { routes } from '../routes';

import { ChannelsBoxHeader } from './ChannelsBoxHeader';
import { ChannelsBoxBody } from './ChannelsBoxBody';
import { MessagesBoxHeader } from './MessagesBoxHeader';
import { MessagesBoxBody } from './MessagesBoxBody';
import { MessagesBoxFooter } from './MessagesBoxFooter';

import { actions as channelsActions } from '../slices/channelsSlice';
import { actions as messagesActions } from '../slices/messagesSlice';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('user'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const getNormalize = (data) => {
  const { channels, currentChannelId, messages } = data;
  const normalizedChannels = channels.reduce((acc, channel) => {
    const { id } = channel;
    return {
      ...acc,
      [id]: channel,
    };
  }, {});
  const normalizedMessages = messages.reduce((acc, message) => {
    const { id } = message;
    return {
      ...acc,
      [id]: message,
    };
  }, {});

  return {
    channels: normalizedChannels,
    currentChannelId,
    messages: normalizedMessages,
  };
};

export const ChatPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.dataPath(), {
        headers: getAuthHeader(),
      });
      const { channels, currentChannelId, messages } = getNormalize(data);

      dispatch(channelsActions.addChannels(channels));
      dispatch(channelsActions.setCurrentChannelId(currentChannelId));
      dispatch(messagesActions.addMessages(messages));
    };

    fetchData();
  }, [dispatch]);

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <Row className="h-100 bg-white">
        <Col md={2} xs={4} className="border-end px-0 bg-light h-100 d-flex flex-column">
          <ChannelsBoxHeader />
          <ChannelsBoxBody />
        </Col>
        <Col className="p-0 h-100 d-flex flex-column">
          <MessagesBoxHeader />
          <MessagesBoxBody />
          <MessagesBoxFooter />
        </Col>
      </Row>
    </Container>
  );
};
