import { Col } from 'react-bootstrap';

import { MessagesBoxHeader } from './MessagesBoxHeader';
import { MessagesBoxBody } from './MessagesBoxBody';
import { MessagesBoxFooter } from './MessagesBoxFooter';

export const MessagesBox = () => (
  <Col className="p-0 h-100 d-flex flex-column">
    <MessagesBoxHeader />
    <MessagesBoxBody />
    <MessagesBoxFooter />
  </Col>
);
