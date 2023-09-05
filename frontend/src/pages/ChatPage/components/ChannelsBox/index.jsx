/* eslint-disable import/prefer-default-export */
import { Col } from 'react-bootstrap';

import { ChannelsBoxHeader } from './ChannelsBoxHeader';
import { ChannelsBoxBody } from './ChannelsBoxBody';
import { CustomModal } from './CustomModal';

export const ChannelsBox = () => (
  <Col md={2} xs={4} className="border-end px-0 bg-light h-100 d-flex flex-column">
    <ChannelsBoxHeader />
    <ChannelsBoxBody />
    <CustomModal />
  </Col>
);
