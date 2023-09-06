/* eslint-disable import/prefer-default-export */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { modalsSelectors } from '../../../../../store/slices';
import { useAPI } from '../../../../../contexts';

export const Remove = ({ hideModal }) => {
  const { t } = useTranslation();
  const { removeChannel } = useAPI();

  const id = useSelector(modalsSelectors.selectChannelId);

  const handleRemove = () => {
    removeChannel(id, () => {
      hideModal();
    });
  };

  // не получается повесиь слушатель
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
