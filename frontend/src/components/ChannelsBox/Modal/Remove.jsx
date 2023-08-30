import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';

import { socket } from '../../../api';

const handlePushEnter = (handler) => (e) => {
  if (e.code === 'Enter') {
    handler();
  }
};

export const Remove = ({ modalShown, hideModal, id }) => {
  const handleRemove = () => {
    socket.emit('removeChannel', { id }, ({ status }) => {
      if (status === 'ok') {
        hideModal();
      }
    });
  };

  const btnRef = useRef(null);
  useEffect(() => {
    btnRef.current.addEventListener('keyup', handlePushEnter);
    return btnRef.current.removeEventListener('keyup', handlePushEnter);
  }, []);

  return (
    <Modal
      centered
      show={modalShown}
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={hideModal}>Отменить</Button>
          <Button variant="danger" onClick={handleRemove} ref={btnRef}>Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};