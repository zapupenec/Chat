import React, { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { socket } from '../../../api';

const handlePushEnter = (handler) => (e) => {
  if (e.code === 'Enter') {
    handler();
  }
};

export const Remove = ({ modalShown, hideModal, id }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    socket.emit('removeChannel', { id }, ({ status }) => {
      hideModal();
      if (status === 'ok') {
        toast.success(t('toasts.remove'));
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
          {t('channelsBox.removeTitle')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channelsBox.areYouSure')}</p>
        <div className="d-flex justify-content-end">
          <Button className="me-2" variant="secondary" onClick={hideModal}>{t('buttons.cancel')}</Button>
          <Button variant="danger" onClick={handleRemove} ref={btnRef}>{t('buttons.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
