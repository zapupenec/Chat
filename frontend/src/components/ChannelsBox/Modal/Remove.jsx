/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { socketAPI } from '../../../api';

const handlePushEnter = (handler) => (e) => {
  if (e.code === 'Enter' || e.code === 'NumpadEnter') {
    handler();
  }
};

export const Remove = ({ modalShown, hideModal, id }) => {
  const { t } = useTranslation();

  const handleRemove = () => {
    socketAPI.sendRemoveChannel({ id }, ({ status }) => {
      if (status === 'ok') {
        hideModal();
        toast.success(t('toasts.remove'));
      } else {
        toast.error(t('toasts.netWorkError'));
      }
    });
  };

  const btnRef = useRef(null);
  useEffect(() => {
    const { current } = btnRef;
    current.addEventListener('keydown', handlePushEnter);
    return () => {
      current.removeEventListener('keydown', handlePushEnter);
    };
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
