/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../../../common-components';
import { modalsActions } from '../../../../store/slices';

export const ChannelsBoxHeader = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const showModal = (type) => () => {
    dispatch(modalsActions.setTypeModal(type));
  };

  return (
    <div className="d-flex justify-content-between mt-1 mb-2 py-4 ps-4 pe-2">
      <b>{t('channelsBox.title')}</b>
      <Button
        variant=""
        type="button"
        className="p-0 btn-group-vertical text-primary"
        onClick={showModal('add')}
      >
        <Icon name="plus-square" size={20} />
        <span className="visually-hidden">{t('buttons.add')}</span>
      </Button>
    </div>
  );
};
