/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { socketAPI } from '../../../../../api';
import { modalsActions, modalsSelectors } from '../../../../../store/slices';

export const Remove = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const id = useSelector(modalsSelectors.selectChannelId);
  const hideModal = () => {
    dispatch(modalsActions.setTypeModal(null));
  };

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
    const handlePushEnter = (e) => {
      if (e.key === 'Enter') {
        handleRemove();
      }
    };

    const { current } = btnRef;
    current.addEventListener('keyup', handlePushEnter);
    return () => {
      current.removeEventListener('keyup', handlePushEnter);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <p className="lead">{t('modals.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <Button
          className="me-2"
          variant="secondary"
          onClick={hideModal}
        >
          {t('buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleRemove} ref={btnRef}>{t('buttons.remove')}</Button>
      </div>
    </>
  );
};
