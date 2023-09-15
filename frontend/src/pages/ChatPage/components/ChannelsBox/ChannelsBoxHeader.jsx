/* eslint-disable import/prefer-default-export */
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Icon } from '../../../../common-components';
import { modalsActions } from '../../../../store/slices';

const className = [
  'p-0',
  'text-primary',
].join(' ');

export const ChannelsBoxHeader = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(modalsActions.openModal({ type: 'add' }));
  };

  return (
    <div className="d-flex justify-content-between mt-1 mb-2 py-4 ps-4 pe-2">
      <b>{t('chatPage.channelsBox.title')}</b>
      <Button
        type="button"
        variant="group-vertical"
        className={className}
        onClick={handleClick}
      >
        <Icon name="plus-square" size={20} />
        <span className="visually-hidden">{t('buttons.add')}</span>
      </Button>
    </div>
  );
};
