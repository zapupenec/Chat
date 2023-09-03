/* eslint-disable import/prefer-default-export */
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Icon } from '../Icon';
import { Modal } from './Modal';

export const ChannelsBoxHeader = () => {
  const { t } = useTranslation();

  const [modalShown, setModalShown] = useState(false);
  const hideModal = () => setModalShown(false);
  const showModal = () => setModalShown(true);

  return (
    <div className="d-flex justify-content-between mt-1 mb-2 py-4 ps-4 pe-2">
      <b>{t('channelsBox.title')}</b>
      <Button
        variant=""
        type="button"
        className="p-0 btn-group-vertical text-primary"
        onClick={showModal}
      >
        <Icon name="plus-square" size={20} />
        <span className="visually-hidden">{t('buttons.add')}</span>
      </Button>
      <Modal
        modalName="Add"
        modalShown={modalShown}
        hideModal={hideModal}
      />
    </div>
  );
};
